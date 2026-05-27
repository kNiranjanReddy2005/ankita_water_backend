import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import LoadModel from "../models/LoadModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(LoadModel.all()));
router.post("/:direction", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = LoadModel.create(req.params.direction, req.body);
  return item ? res.status(201).json(item) : res.status(404).json({ message: "Load direction not found." });
});

export default router;
