import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import EventModel from "../models/EventModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => res.json(await EventModel.all())));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => res.status(201).json(await EventModel.create(req.body))));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const item = await EventModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Event not found." });
}));
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), asyncHandler(async (req, res) => {
  const item = await EventModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Event not found." });
}));

export default router;
