import crypto from "node:crypto";

export function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function comparePassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword;
}
