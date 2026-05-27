import { Router } from "express";
import { authenticate } from "../middleware/AuthMiddleware.js";
import { db } from "../data/store.js";
import { clone } from "../utils/helpers.js";

const router = Router();

router.get("/", authenticate, (_req, res) => {
  res.json(
    clone({
      business: db.business,
      heroSlides: db.heroSlides,
      dashboardModules: db.dashboardModules,
      products: db.products,
      groups: db.groups,
      customers: db.customers,
      payments: db.payments,
      invoices: db.invoices,
      expenses: db.expenses,
      employees: db.employees,
      membership: db.membership,
      agency: db.agency,
      reports: db.reports,
      deliveries: db.deliveries,
      loads: db.loads,
      messages: db.messages,
      events: db.events,
      leaves: db.leaves
    })
  );
});

export default router;
