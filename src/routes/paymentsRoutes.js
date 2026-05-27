import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import PaymentModel from "../models/PaymentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (req, res) => res.json(await PaymentModel.all(req.query.type))));
router.post("/:type", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const item = await PaymentModel.create(req.params.type, req.body);
  return item ? res.status(201).json(item) : res.status(404).json({ message: "Payment type not found." });
}));

export default router;
