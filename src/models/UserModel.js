import { db } from "../data/store.js";
import { ROLES } from "../constants/roles.js";
import { clone, createId } from "../utils/helpers.js";
import { hashPassword } from "../utils/security.js";

class UserModel {
  all() {
    return db.users.map(({ passwordHash, ...user }) => clone(user));
  }

  findByEmail(email) {
    return db.users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
  }

  findById(id) {
    return db.users.find((user) => user.id === id) || null;
  }

  create(payload) {
    const user = {
      id: createId("user"),
      name: payload.name,
      email: payload.email,
      role: payload.role || ROLES.USER,
      passwordHash: hashPassword(payload.password)
    };

    db.users.push(user);
    const { passwordHash, ...safeUser } = user;
    return clone(safeUser);
  }

  ensureUser(payload) {
    const existing = this.findByEmail(payload.email);

    if (existing) {
      const { passwordHash, ...safeUser } = existing;
      return clone(safeUser);
    }

    return this.create(payload);
  }

  sanitize(user) {
    const { passwordHash, ...safeUser } = user;
    return clone(safeUser);
  }
}

export default new UserModel();
