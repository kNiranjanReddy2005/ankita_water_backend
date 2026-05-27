import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/authRoutes.js";
import bootstrapRoutes from "./routes/bootstrapRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import groupsRoutes from "./routes/groupsRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import deliveriesRoutes from "./routes/deliveriesRoutes.js";
import loadsRoutes from "./routes/loadsRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js";
import invoicesRoutes from "./routes/invoicesRoutes.js";
import expensesRoutes from "./routes/expensesRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import leavesRoutes from "./routes/leavesRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import agencyRoutes from "./routes/agencyRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import { closeDatabaseConnection, connectDatabase } from "./data/database.js";
import { ensureStateSeeded } from "./data/store.js";
import { seedAdminUsers } from "./seeds/seedAdmin.js";

const app = express();
const PORT = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/bootstrap", bootstrapRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/agency", agencyRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/deliveries", deliveriesRoutes);
app.use("/api/loads", loadsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/leaves", leavesRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  return res.sendFile(path.join(clientDistPath, "index.html"));
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error." });
});

async function startServer() {
  await connectDatabase();
  await ensureStateSeeded();
  await seedAdminUsers();

  app.listen(PORT, () => {
    console.log(`Water ERP running on http://localhost:${PORT}`);
    console.log("Seeded users:");
    console.log("  superadmin@purepani.in / Super@123");
    console.log("  admin@purepani.in / Admin@123");
    console.log("  owner@purepani.in / Water@123");
  });
}

startServer().catch(async (error) => {
  console.error("Failed to start server.");
  console.error(error);
  await closeDatabaseConnection();
  process.exit(1);
});
