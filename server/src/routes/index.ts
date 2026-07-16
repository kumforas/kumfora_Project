import { Router } from "express";
import feedbackRoutes from "./feedback.routes";
import contactRoutes from "./contact.routes";
import newsletterRoutes from "./newsletter.routes";
import orderRoutes from "./order.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/contact", contactRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/orders", orderRoutes);
router.use("/health", healthRoutes);

export default router;
