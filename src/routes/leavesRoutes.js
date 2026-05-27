import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import LeaveModel from "../models/LeaveModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(LeaveModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(LeaveModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = LeaveModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Leave record not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = LeaveModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Leave record not found." });
});

export default router;
