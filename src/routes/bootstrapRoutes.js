import { Router } from "express";
import { authenticate } from "../middleware/AuthMiddleware.js";
import { getState } from "../data/store.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => {
  res.json(await getState());
}));

export default router;
