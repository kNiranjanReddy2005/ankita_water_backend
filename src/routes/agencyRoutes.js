import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import AgencyModel from "../models/AgencyModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => res.json(await AgencyModel.get())));
router.put("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => res.json(await AgencyModel.update(req.body))));

export default router;
