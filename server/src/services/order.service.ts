import { getSupabase } from "../lib/supabase";
import { syncOrderToNotion } from "../lib/notion/sync";
import type { OrderInput, OrderRecord, ApiResponse } from "../types";

const TABLE = "orders";

function generateOrderId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 6);
  return `KMF-${ts}-${rand}`.toUpperCase();
}

export class OrderService {
  static async create(input: OrderInput): Promise<ApiResponse<OrderRecord>> {
    const now = new Date().toISOString();
    const orderId = generateOrderId();

    const row = {
      order_id: orderId,
      ...input,
      user_id: input.user_id || null,
      items: JSON.stringify(input.items),
      status: "pending",
      created_at: now,
    };

    const [supabaseResult, notionResult] = await Promise.allSettled([
      getSupabase()
        .from(TABLE)
        .insert(row)
        .select()
        .single(),
      syncOrderToNotion({
        order_id: orderId,
        email: input.email,
        phone: input.phone,
        first_name: input.first_name,
        last_name: input.last_name,
        address: input.address,
        city: input.city,
        state: input.state,
        pincode: input.pincode,
        payment_method: input.payment_method,
        total: input.total,
        status: "pending",
        created_at: now,
      }),
    ]);

    const warnings: string[] = [];
    let data: OrderRecord | null = null;

    if (supabaseResult.status === "fulfilled" && !supabaseResult.value.error) {
      data = {
        ...supabaseResult.value.data,
        items: input.items,
      } as OrderRecord;
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

    if (!data) {
      return { success: false, error: "Failed to save order to Supabase" };
    }

    return {
      success: true,
      data,
      ...(warnings.length > 0 && { warnings }),
    };
  }

  static async findByOrderId(orderId: string): Promise<ApiResponse<OrderRecord>> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error) {
      return { success: false, error: "Order not found" };
    }

    const order = {
      ...data,
      items: typeof data.items === "string" ? JSON.parse(data.items) : data.items,
    } as OrderRecord;

    return { success: true, data: order };
  }
}
