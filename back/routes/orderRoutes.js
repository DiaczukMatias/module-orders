import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

router.put("/:id", protect, isAdmin, updateOrderStatus);

export default router;
