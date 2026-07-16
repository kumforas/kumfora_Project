import { Router } from "express";
import { FeedbackController } from "../controllers/feedback.controller";

const router = Router();

router.post("/", FeedbackController.create);
router.get("/", FeedbackController.list);

export default router;
