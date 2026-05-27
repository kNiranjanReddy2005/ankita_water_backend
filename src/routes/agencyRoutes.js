import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import AgencyModel from "../models/AgencyModel.js";

const router = Router();

router.get("/", authenticate, (_req, res) => res.json(AgencyModel.get()));
router.put("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (req, res) => res.json(AgencyModel.update(req.body)));

export default router;
