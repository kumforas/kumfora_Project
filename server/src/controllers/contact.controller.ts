import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import type { ContactInput } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;
const VALID_TOPICS = ["order", "product", "shipping", "returns", "period", "wholesale", "other"] as const;

export class ContactController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body as Record<string, unknown>;
      const errors: string[] = [];

      if (!body.first_name || typeof body.first_name !== "string" || !body.first_name.trim()) {
        errors.push("first_name is required");
      }
      if (!body.last_name || typeof body.last_name !== "string" || !body.last_name.trim()) {
        errors.push("last_name is required");
      }
      if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email)) {
        errors.push("A valid email is required");
      }
      if (body.phone && typeof body.phone === "string" && body.phone.trim()) {
        if (!PHONE_REGEX.test(body.phone)) {
          errors.push("Phone must be exactly 10 digits");
        }
      }
      if (!body.topic || typeof body.topic !== "string" || !(VALID_TOPICS as readonly string[]).includes(body.topic)) {
        errors.push(`topic must be one of: ${VALID_TOPICS.join(", ")}`);
      }
      if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
        errors.push("message is required");
      }

      if (errors.length > 0) {
        res.status(400).json({ success: false, error: errors.join("; ") });
        return;
      }

      const input: ContactInput = {
        first_name: (body.first_name as string).trim(),
        last_name: (body.last_name as string).trim(),
        email: (body.email as string).trim().toLowerCase(),
        phone: body.phone ? (body.phone as string).trim() : "",
        order_number: body.order_number ? (body.order_number as string).trim() : undefined,
        topic: body.topic as string,
        message: (body.message as string).trim(),
      };

      const result = await ContactService.create(input);

      if (!result.success) {
        res.status(500).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
