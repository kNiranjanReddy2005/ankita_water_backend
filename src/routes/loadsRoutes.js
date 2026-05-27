import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import LoadModel from "../models/LoadModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => res.json(await LoadModel.all())));
router.post("/:direction", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const item = await LoadModel.create(req.params.direction, req.body);
  return item ? res.status(201).json(item) : res.status(404).json({ message: "Load direction not found." });
}));

export default router;
