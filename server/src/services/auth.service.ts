import { getSupabase } from "../lib/supabase";
import type { User, ApiResponse } from "../types";

const PROFILES_TABLE = "profiles";

export class AuthService {
  static async getProfile(userId: string): Promise<ApiResponse<User>> {
    const { data, error } = await getSupabase()
      .from(PROFILES_TABLE)
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, error: "Profile not found" };
    }

    return { success: true, data: data as User };
  }

  static async updateProfile(
    userId: string,
    updates: { first_name?: string; last_name?: string; phone?: string }
  ): Promise<ApiResponse<User>> {
    const { data, error } = await getSupabase()
      .from(PROFILES_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return { success: false, error: "Failed to update profile" };
    }

    return { success: true, data: data as User };
  }

  static async getUserOrders(userId: string): Promise<ApiResponse<any[]>> {
    const { data, error } = await getSupabase()
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: "Failed to fetch orders" };
    }

    return { success: true, data: data ?? [] };
  }

  static async deleteAccount(userId: string): Promise<ApiResponse<null>> {
    const { error } = await getSupabase().auth.admin.deleteUser(userId);

    if (error) {
      return { success: false, error: "Failed to delete account" };
    }

    return { success: true, data: null };
  }
}
