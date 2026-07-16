import { Request, Response, NextFunction } from "express";
import { FeedbackService } from "../services/feedback.service";
import type { FeedbackInput } from "../types";

function validateFeedbackInput(body: Record<string, unknown>): body is Record<string, unknown> & FeedbackInput {
  const { name, email, rating, message } = body;

  if (!name || !email || !rating || !message) return false;
  if (typeof rating !== "number" || rating < 1 || rating > 5) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email as string)) return false;

  return true;
}

export class FeedbackController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!validateFeedbackInput(req.body)) {
        res.status(400).json({
          success: false,
          error: "Invalid input: name, email, rating (1-5), and message are required",
        });
        return;
      }

      const result = await FeedbackService.create(req.body);

      if (!result.success) {
        res.status(500).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await FeedbackService.findAll();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}
