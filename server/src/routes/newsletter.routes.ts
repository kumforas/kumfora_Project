import { Router } from "express";
import { NewsletterController } from "../controllers/newsletter.controller";

const router = Router();

router.post("/", NewsletterController.subscribe);

export default router;
