import { data } from "../data.js";
import { withIds } from "../utils/helpers.js";

export const db = {
  users: [],
  business: {
    id: "business-1",
    ...data.business
  },
  heroSlides: withIds(data.heroSlides, "hero"),
  dashboardModules: withIds(data.dashboardModules, "module"),
  products: withIds(data.products, "product"),
  groups: withIds(data.groups, "group"),
  customers: withIds(data.customers, "customer"),
  payments: {
    customer: withIds(data.payments.customer, "customer-payment"),
    employee: withIds(data.payments.employee, "employee-payment")
  },
  invoices: withIds(data.invoices, "invoice"),
  expenses: withIds(data.expenses, "expense"),
  employees: withIds(data.employees, "employee"),
  membership: {
    id: "membership-1",
    ...data.membership
  },
  agency: {
    id: "agency-1",
    ...data.agency
  },
  reports: {
    id: "reports-1",
    ...data.reports
  },
  deliveries: withIds(
    [
      { customer: "Sibu Battle Shop", route: "Market Route", quantity: "12 cans", status: "On Route" },
      { customer: "Mahalaxmi Bhandar", route: "Lakmiposi Route", quantity: "6 cans", status: "Scheduled" },
      { customer: "Asish Pall", route: "Takatpur Route", quantity: "18 cans", status: "Completed" }
    ],
    "delivery"
  ),
  loads: {
    inbound: withIds(
      [
        { product: "20L Water Jar", quantity: "120 units", by: "Plant Manager" },
        { product: "500ML Bottles", quantity: "35 crates", by: "Warehouse Team" }
      ],
      "inbound-load"
    ),
    outbound: withIds(
      [
        { product: "20L Empty Jar Return", quantity: "46 units", by: "Delivery Team" },
        { product: "Damaged Bottle Removal", quantity: "3 crates", by: "Quality Team" }
      ],
      "outbound-load"
    )
  },
  messages: withIds(
    [
      { title: "Payment Reminder", audience: "Due Customers", body: "Please clear your pending payment to continue uninterrupted delivery service." },
      { title: "Holiday Delivery Notice", audience: "All Customers", body: "Delivery timings will change slightly during the upcoming holiday period." }
    ],
    "message"
  ),
  events: withIds(
    [
      { name: "New Store Launch Supply", customer: "Mahalaxmi Bhandar", date: "28 May 2026", status: "Upcoming" },
      { name: "Bulk Marriage Event", customer: "Tukuna Bhai", date: "31 May 2026", status: "Scheduled" }
    ],
    "event"
  ),
  leaves: withIds(
    [
      { employee: "Rahul Hansda", date: "29 May 2026", reason: "Personal leave", status: "Approved" },
      { employee: "Amit Lenka", date: "02 Jun 2026", reason: "Medical visit", status: "Pending" }
    ],
    "leave"
  )
};
