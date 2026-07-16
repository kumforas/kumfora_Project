import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { optionalAuth } from "../middleware/auth";

const router = Router();

router.post("/", optionalAuth, OrderController.create);
router.get("/", OrderController.getByOrderId);

export default router;
