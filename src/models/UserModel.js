import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";
import { connectDatabase } from "../data/database.js";
import { clone, createId } from "../utils/helpers.js";
import { hashPassword } from "../utils/security.js";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, required: true, enum: Object.values(ROLES) },
    passwordHash: { type: String, required: true }
  },
  {
    collection: "users",
    versionKey: false
  }
);

const UserRecord = mongoose.models.UserRecord || mongoose.model("UserRecord", userSchema);

class UserModel {
  async ensureIndexes() {
    await connectDatabase();
    await UserRecord.syncIndexes();
  }

  async all() {
    await connectDatabase();
    const users = await UserRecord.find({}, { _id: 0, passwordHash: 0 }).lean();
    return clone(users);
  }

  async findByEmail(email) {
    await connectDatabase();
    return UserRecord.findOne({ email: String(email).toLowerCase() }, { _id: 0 }).lean();
  }

  async findById(id) {
    await connectDatabase();
    return UserRecord.findOne({ id }, { _id: 0 }).lean();
  }

  async create(payload) {
    await connectDatabase();
    const user = {
      id: createId("user"),
      name: payload.name,
      email: String(payload.email).toLowerCase(),
      role: payload.role || ROLES.USER,
      passwordHash: hashPassword(payload.password)
    };

    await UserRecord.create(user);
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
