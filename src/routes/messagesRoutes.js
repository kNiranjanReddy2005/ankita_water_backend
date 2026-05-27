import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import MessageModel from "../models/MessageModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => res.json(await MessageModel.all())));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => res.status(201).json(await MessageModel.create(req.body))));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const item = await MessageModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Message not found." });
}));
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), asyncHandler(async (req, res) => {
  const item = await MessageModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Message not found." });
}));

export default router;
