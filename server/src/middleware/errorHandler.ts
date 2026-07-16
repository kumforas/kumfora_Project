import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(`[Error] ${err.message}`);

  if (err.message.includes("Supabase") && err.message.includes("not configured")) {
    res.status(503).json({ success: false, error: "Service not configured" });
    return;
  }

  res.status(500).json({ success: false, error: "Internal server error" });
}
