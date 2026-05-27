import { data } from "../data.js";
import { createId, clone, withIds } from "../utils/helpers.js";
import { getDatabase } from "./database.js";

const STATE_COLLECTION = "app_state";
const STATE_ID = "water-erp-state";

function getInitialState() {
  return {
    business: {
      id: "business-1",
      ...clone(data.business)
    },
    heroSlides: withIds(clone(data.heroSlides), "hero"),
    dashboardModules: withIds(clone(data.dashboardModules), "module"),
    products: withIds(clone(data.products), "product"),
    groups: withIds(clone(data.groups), "group"),
    customers: withIds(clone(data.customers), "customer"),
    payments: {
      customer: withIds(clone(data.payments.customer), "customer-payment"),
      employee: withIds(clone(data.payments.employee), "employee-payment")
    },
    invoices: withIds(clone(data.invoices), "invoice"),
    expenses: withIds(clone(data.expenses), "expense"),
    employees: withIds(clone(data.employees), "employee"),
    membership: {
      id: "membership-1",
      ...clone(data.membership)
    },
    agency: {
      id: "agency-1",
      ...clone(data.agency)
    },
    reports: {
      id: "reports-1",
      ...clone(data.reports)
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
}

function getByPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function setByPath(target, path, value) {
  const segments = path.split(".");
  const finalKey = segments.pop();
  let cursor = target;

  for (const segment of segments) {
    if (!cursor[segment] || typeof cursor[segment] !== "object") {
      cursor[segment] = {};
    }

    cursor = cursor[segment];
  }

  cursor[finalKey] = value;
}

async function getStateCollection() {
  const database = await getDatabase();
  return database.collection(STATE_COLLECTION);
}

export async function ensureStateSeeded() {
  const collection = await getStateCollection();
  const existingState = await collection.findOne({ _id: STATE_ID });

  if (!existingState) {
    await collection.insertOne({
      _id: STATE_ID,
      ...getInitialState()
    });
  }
}

export async function getState() {
  await ensureStateSeeded();
  const collection = await getStateCollection();
  const state = await collection.findOne({ _id: STATE_ID });

  if (!state) {
    return getInitialState();
  }

  const { _id, ...rest } = state;
  return clone(rest);
}

async function saveState(state) {
  const collection = await getStateCollection();
  await collection.replaceOne(
    { _id: STATE_ID },
    {
      _id: STATE_ID,
      ...state
    },
    { upsert: true }
  );
}

export async function getStateValue(path) {
  return clone(getByPath(await getState(), path));
}

export async function replaceStateValue(path, value) {
  const state = await getState();
  setByPath(state, path, value);
  await saveState(state);
  return clone(value);
}

export async function patchStateValue(path, payload) {
  const currentValue = (await getStateValue(path)) || {};
  const nextValue = {
    ...currentValue,
    ...payload
  };

  await replaceStateValue(path, nextValue);
  return clone(nextValue);
}

export async function listRecords(path) {
  const records = await getStateValue(path);
  return Array.isArray(records) ? records : [];
}

export async function findRecordById(path, id) {
  const records = await listRecords(path);
  return records.find((item) => item.id === id) || null;
}

export async function createRecord(path, idPrefix, payload) {
  const records = await getStateValue(path);

  if (!Array.isArray(records)) {
    return null;
  }

  const record = {
    id: createId(idPrefix),
    ...payload
  };

  records.unshift(record);
  await replaceStateValue(path, records);
  return clone(record);
}

export async function updateRecord(path, id, payload) {
  const records = await getStateValue(path);

  if (!Array.isArray(records)) {
    return null;
  }

  const index = records.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  records[index] = {
    ...records[index],
    ...payload,
    id
  };

  await replaceStateValue(path, records);
  return clone(records[index]);
}

export async function removeRecord(path, id) {
  const records = await getStateValue(path);

  if (!Array.isArray(records)) {
    return null;
  }

  const index = records.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [removedRecord] = records.splice(index, 1);
  await replaceStateValue(path, records);
  return clone(removedRecord);
}
