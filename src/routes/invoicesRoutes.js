import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import InvoiceModel from "../models/InvoiceModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(InvoiceModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(InvoiceModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = InvoiceModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Invoice not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = InvoiceModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Invoice not found." });
});

export default router;
