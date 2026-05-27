import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import MessageModel from "../models/MessageModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(MessageModel.all()));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.status(201).json(MessageModel.create(req.body)));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => {
  const item = MessageModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Message not found." });
});
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const item = MessageModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Message not found." });
});

export default router;
