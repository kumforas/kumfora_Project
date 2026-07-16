import { getSupabase } from "../lib/supabase";
import { syncContactToNotion } from "../lib/notion/sync";
import type { ContactInput, ContactSubmission, ApiResponse } from "../types";

const TABLE = "contact_submissions";

export class ContactService {
  static async create(input: ContactInput): Promise<ApiResponse<ContactSubmission>> {
    const now = new Date().toISOString();
    const row = { ...input, order_number: input.order_number || null, created_at: now };

    const [supabaseResult, notionResult] = await Promise.allSettled([
      getSupabase()
        .from(TABLE)
        .insert(row)
        .select()
        .single(),
      syncContactToNotion({ ...input, order_number: input.order_number || null, created_at: now }),
    ]);

    const warnings: string[] = [];
    let data: ContactSubmission | null = null;

    if (supabaseResult.status === "fulfilled" && !supabaseResult.value.error) {
      data = supabaseResult.value.data as ContactSubmission;
    } else {
      const msg =
        supabaseResult.status === "rejected"
          ? supabaseResult.reason?.message || "Supabase save failed"
          : supabaseResult.value.error?.message || "Supabase save failed";
      warnings.push(`Supabase: ${msg}`);
    }

    if (notionResult.status === "fulfilled" && notionResult.value.success) {
      // OK
    } else {
      const msg =
        notionResult.status === "rejected"
          ? "Notion save failed"
          : notionResult.value.error || "Notion save failed";
      warnings.push(`Notion: ${msg}`);
    }

    if (!data && warnings.length === 2) {
      return { success: false, error: "Failed to save to both Supabase and Notion" };
    }

    return {
      success: true,
      data: data!,
      ...(warnings.length > 0 && { warnings }),
    };
  }
}
