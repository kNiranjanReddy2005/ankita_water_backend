import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import ProductModel from "../models/ProductModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authenticate, asyncHandler(async (_req, res) => res.json(await ProductModel.all())));
router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => res.status(201).json(await ProductModel.create(req.body))));
router.put("/:id", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), asyncHandler(async (req, res) => {
  const item = await ProductModel.update(req.params.id, req.body);
  return item ? res.json(item) : res.status(404).json({ message: "Product not found." });
}));
router.delete("/:id", authenticate, authorize(ROLES.SUPER_ADMIN), asyncHandler(async (req, res) => {
  const item = await ProductModel.remove(req.params.id);
  return item ? res.json(item) : res.status(404).json({ message: "Product not found." });
}));

export default router;
