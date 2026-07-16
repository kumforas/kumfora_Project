import { getSupabase } from "../lib/supabase";
import { syncNewsletterToNotion } from "../lib/notion/sync";
import type { NewsletterInput, NewsletterSubscriber, ApiResponse } from "../types";

const TABLE = "newsletter_subscribers";

export class NewsletterService {
  static async subscribe(input: NewsletterInput): Promise<ApiResponse<NewsletterSubscriber>> {
    const supabase = getSupabase();

    const existing = await supabase
      .from(TABLE)
      .select("id")
      .eq("email", input.email)
      .single();

    if (existing.data) {
      return { success: false, error: "Email already subscribed" };
    }

    const now = new Date().toISOString();
    const row = { email: input.email, created_at: now };

    const [supabaseResult, notionResult] = await Promise.allSettled([
      supabase
        .from(TABLE)
        .insert(row)
        .select()
        .single(),
      syncNewsletterToNotion({ email: input.email, created_at: now }),
    ]);

    const warnings: string[] = [];
    let data: NewsletterSubscriber | null = null;

    if (supabaseResult.status === "fulfilled" && !supabaseResult.value.error) {
      data = supabaseResult.value.data as NewsletterSubscriber;
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
