import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import EventModel from "../models/EventModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(EventModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(EventModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = EventModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Event not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = EventModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Event not found." });
});

export default router;
