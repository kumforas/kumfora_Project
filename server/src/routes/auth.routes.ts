import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth, AuthController.getMe);
router.put("/me", requireAuth, AuthController.updateProfile);
router.delete("/me", requireAuth, AuthController.deleteAccount);
router.get("/orders", requireAuth, AuthController.getMyOrders);

export default router;
