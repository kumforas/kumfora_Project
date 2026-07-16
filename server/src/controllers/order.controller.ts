import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";
import type { OrderInput } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const PINCODE_REGEX = /^\d{6}$/;
const VALID_PAYMENT_METHODS = ["cod", "card"] as const;

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as Record<string, unknown>;
      const errors: string[] = [];

      if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email)) {
        errors.push("A valid email is required");
      }
      if (!body.phone || typeof body.phone !== "string" || !PHONE_REGEX.test(body.phone)) {
        errors.push("Phone must be exactly 10 digits");
      }
      if (!body.first_name || typeof body.first_name !== "string" || !body.first_name.trim()) {
        errors.push("first_name is required");
      }
      if (!body.last_name || typeof body.last_name !== "string" || !body.last_name.trim()) {
        errors.push("last_name is required");
      }
      if (!body.address || typeof body.address !== "string" || !body.address.trim()) {
        errors.push("address is required");
      }
      if (!body.city || typeof body.city !== "string" || !body.city.trim()) {
        errors.push("city is required");
      }
      if (!body.state || typeof body.state !== "string" || !body.state.trim()) {
        errors.push("state is required");
      }
      if (!body.pincode || typeof body.pincode !== "string" || !PINCODE_REGEX.test(body.pincode)) {
        errors.push("Pincode must be exactly 6 digits");
      }
      if (!body.payment_method || typeof body.payment_method !== "string" || !(VALID_PAYMENT_METHODS as readonly string[]).includes(body.payment_method)) {
        errors.push(`payment_method must be one of: ${VALID_PAYMENT_METHODS.join(", ")}`);
      }

      if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
        errors.push("At least one item is required");
      } else {
        body.items.forEach((item: any, i: number) => {
          if (!item.product || !item.product.id) errors.push(`Item ${i + 1}: product is required`);
          if (!item.quantity || typeof item.quantity !== "number" || item.quantity < 1) errors.push(`Item ${i + 1}: quantity must be >= 1`);
        });
      }

      const toNum = (v: unknown): number => (typeof v === "number" ? v : parseFloat(v as string) || 0);
      const subtotal = toNum(body.subtotal);
      const shipping = toNum(body.shipping);
      const total = toNum(body.total);

      if (subtotal < 0) errors.push("subtotal must be >= 0");
      if (shipping < 0) errors.push("shipping must be >= 0");
      if (total < 0) errors.push("total must be >= 0");

      if (errors.length > 0) {
        res.status(400).json({ success: false, error: errors.join("; ") });
        return;
      }

      const input: OrderInput = {
        email: (body.email as string).trim().toLowerCase(),
        phone: (body.phone as string).trim(),
        first_name: (body.first_name as string).trim(),
        last_name: (body.last_name as string).trim(),
        address: (body.address as string).trim(),
        city: (body.city as string).trim(),
        state: (body.state as string).trim(),
        pincode: (body.pincode as string).trim(),
        payment_method: body.payment_method as string,
        items: body.items as OrderInput["items"],
        subtotal,
        shipping,
        total,
        user_id: req.user?.userId,
      };

      const result = await OrderService.create(input);

      if (!result.success) {
        res.status(500).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getByOrderId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderId = req.query.orderId as string;

      if (!orderId) {
        res.status(400).json({ success: false, error: "Order ID is required" });
        return;
      }

      const result = await OrderService.findByOrderId(orderId);

      if (!result.success) {
        res.status(404).json(result);
        return;
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
