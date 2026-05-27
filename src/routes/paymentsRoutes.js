import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import PaymentModel from "../models/PaymentModel.js";

const router = Router();

router.get("/", authenticate, (req, res) => res.json(PaymentModel.all(req.query.type)));
router.post("/:type", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = PaymentModel.create(req.params.type, req.body);
  return item ? res.status(201).json(item) : res.status(404).json({ message: "Payment type not found." });
});

export default router;
