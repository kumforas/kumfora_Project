import { Request, Response, NextFunction } from "express";
import { NewsletterService } from "../services/newsletter.service";

export class NewsletterController {
  static async subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ success: false, error: "Email is required" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ success: false, error: "Invalid email address" });
        return;
      }

      const result = await NewsletterService.subscribe({ email });

      if (!result.success) {
        res.status(409).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
