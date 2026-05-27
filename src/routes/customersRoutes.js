import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import CustomerModel from "../models/CustomerModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(CustomerModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(CustomerModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = CustomerModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Customer not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = CustomerModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Customer not found." });
});

export default router;
