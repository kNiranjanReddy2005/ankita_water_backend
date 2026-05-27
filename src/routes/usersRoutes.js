import { Router } from "express";
import { ROLE_VALUES, ROLES } from "../constants/roles.js";
import { authenticate, authorize } from "../middleware/AuthMiddleware.js";
import UserModel from "../models/UserModel.js";

const router = Router();

router.get("/", authenticate, authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), (_req, res) => {
  res.json(UserModel.all());
});

router.post("/", authenticate, authorize(ROLES.SUPER_ADMIN), (req, res) => {
  const { name, email, password, role } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required." });
  }

  if (role && !ROLE_VALUES.includes(role)) {
    return res.status(400).json({ message: "Invalid role supplied." });
  }

  if (UserModel.findByEmail(email)) {
    return res.status(409).json({ message: "User email already exists." });
  }

  return res.status(201).json(UserModel.create({ name, email, password, role }));
});

export default router;
