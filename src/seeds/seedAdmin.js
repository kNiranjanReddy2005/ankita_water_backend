import { ROLES } from "../constants/roles.js";
import UserModel from "../models/UserModel.js";

const seededUsers = [
  {
    name: "Super Admin",
    email: "superadmin@purepani.in",
    password: "Super@123",
    role: ROLES.SUPER_ADMIN
  },
  {
    name: "Agency Admin",
    email: "admin@purepani.in",
    password: "Admin@123",
    role: ROLES.ADMIN
  },
  {
    name: "Agency Owner",
    email: "owner@purepani.in",
    password: "Water@123",
    role: ROLES.USER
  }
];

export function seedAdminUsers() {
  return Promise.all(seededUsers.map((user) => UserModel.ensureUser(user)));
}
