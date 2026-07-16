import { getSupabase } from "../lib/supabase";
import { syncFeedbackToNotion } from "../lib/notion/sync";
import type { FeedbackInput, FeedbackRecord, ApiResponse } from "../types";

const TABLE = "feedback";

export class FeedbackService {
  static async create(input: FeedbackInput): Promise<ApiResponse<FeedbackRecord>> {
    const now = new Date().toISOString();
    const row = { ...input, created_at: now };

    const [supabaseResult, notionResult] = await Promise.allSettled([
      getSupabase()
        .from(TABLE)
        .insert(row)
        .select()
        .single(),
      syncFeedbackToNotion({ ...input, created_at: now }),
    ]);

    const warnings: string[] = [];
    let data: FeedbackRecord | null = null;

    if (supabaseResult.status === "fulfilled" && !supabaseResult.value.error) {
      data = supabaseResult.value.data as FeedbackRecord;
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

  static async findAll(): Promise<FeedbackRecord[]> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as FeedbackRecord[];
  }
}
