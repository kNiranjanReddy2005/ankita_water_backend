import crypto from "node:crypto";

const sessions = new Map();

export function createSession(user) {
  const token = crypto.randomUUID();
  sessions.set(token, user);
  return token;
}

export function getSession(token) {
  return sessions.get(token) || null;
}

export function destroySession(token) {
  sessions.delete(token);
}
