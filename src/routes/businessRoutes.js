import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import BusinessModel from "../models/BusinessModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(BusinessModel.get()));
router.put("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.json(BusinessModel.update(req.body)));

export default router;
