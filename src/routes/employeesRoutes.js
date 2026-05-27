import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import EmployeeModel from "../models/EmployeeModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(EmployeeModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(EmployeeModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = EmployeeModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Employee not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = EmployeeModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Employee not found." });
});

export default router;
