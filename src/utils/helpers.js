import crypto from "node:crypto";

export function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function clone(value) {
  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}

export function withIds(items, prefix) {
  return items.map((item, index) => ({
    id: item.id || `${prefix}-${index + 1}`,
    ...item
  }));
}
