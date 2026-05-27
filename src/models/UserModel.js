import { ROLES } from "../constants/roles.js";
import { getDatabase } from "../data/database.js";
import { clone, createId } from "../utils/helpers.js";
import { hashPassword } from "../utils/security.js";

class UserModel {
  async collection() {
    const database = await getDatabase();
    return database.collection("users");
  }

  async ensureIndexes() {
    await (await this.collection()).createIndex({ email: 1 }, { unique: true });
  }

  async all() {
    const users = await (await this.collection()).find({}, { projection: { _id: 0, passwordHash: 0 } }).toArray();
    return clone(users);
  }

  async findByEmail(email) {
    return (await this.collection()).findOne(
      { email: String(email).toLowerCase() },
      { projection: { _id: 0 } }
    );
  }

  async findById(id) {
    return (await this.collection()).findOne({ id }, { projection: { _id: 0 } });
  }

  async create(payload) {
    const user = {
      id: createId("user"),
      name: payload.name,
      email: String(payload.email).toLowerCase(),
      role: payload.role || ROLES.USER,
      passwordHash: hashPassword(payload.password)
    };

    await (await this.collection()).insertOne(user);
    const { passwordHash, ...safeUser } = user;
    return clone(safeUser);
  }

  async ensureUser(payload) {
    await this.ensureIndexes();
    const existing = await this.findByEmail(payload.email);

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
