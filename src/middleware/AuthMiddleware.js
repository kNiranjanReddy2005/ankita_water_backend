import { getSession } from "../store/sessionStore.js";

function extractBearerToken(req) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length);
}

export function authenticate(req, res, next) {
  const token = extractBearerToken(req);

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const user = getSession(token);

  if (!user) {
    return res.status(401).json({ message: "Invalid or expired session." });
  }

  req.token = token;
  req.user = user;
  next();
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not allowed to access this resource." });
    }

    next();
  };
}
