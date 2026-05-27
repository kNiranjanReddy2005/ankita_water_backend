import { Router } from "express";
import { authenticate } from "../middleware/AuthMiddleware.js";
import UserModel from "../models/UserModel.js";
import { destroySession, createSession } from "../store/sessionStore.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassword } from "../utils/security.js";

const router = Router();

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};
  const user = await UserModel.findByEmail(email);

  if (!user || !comparePassword(password || "", user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const safeUser = UserModel.sanitize(user);
  const token = createSession(safeUser);

  return res.json({
    token,
    user: safeUser
  });
}));

router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout", authenticate, (req, res) => {
  destroySession(req.token);
  res.json({ ok: true });
});

export default router;
