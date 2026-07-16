import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { syncProfileToNotion } from "../lib/notion/sync";

export class AuthController {
  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.getProfile(req.user!.userId);

      if (!result.success) {
        res.status(404).json(result);
        return;
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { first_name, last_name, phone } = req.body;

      const updates: { first_name?: string; last_name?: string; phone?: string } = {};
      if (first_name !== undefined) updates.first_name = String(first_name).trim();
      if (last_name !== undefined) updates.last_name = String(last_name).trim();
      if (phone !== undefined) updates.phone = String(phone).trim();

      if (Object.keys(updates).length === 0) {
        res.status(400).json({ success: false, error: "No fields to update" });
        return;
      }

      const result = await AuthService.updateProfile(req.user!.userId, updates);

      if (!result.success) {
        res.status(500).json(result);
        return;
      }

      if (result.data) {
        syncProfileToNotion({
          user_id: req.user!.userId,
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          phone: result.data.phone,
          created_at: result.data.created_at,
        }).catch((err) => console.error("Profile Notion sync failed:", err));
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getMyOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.getUserOrders(req.user!.userId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await AuthService.deleteAccount(req.user!.userId);

      if (!result.success) {
        res.status(500).json(result);
        return;
      }

      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
