import { db } from "../data/store.js";
import { clone, createId } from "../utils/helpers.js";

class BaseModel {
  constructor(collectionName, idPrefix) {
    this.collectionName = collectionName;
    this.idPrefix = idPrefix;
  }

  collection() {
    return db[this.collectionName];
  }

  all() {
    return clone(this.collection());
  }

  findById(id) {
    return this.collection().find((item) => item.id === id) || null;
  }

  create(payload) {
    const record = {
      id: createId(this.idPrefix),
      ...payload
    };

    this.collection().unshift(record);
    return clone(record);
  }

  update(id, payload) {
    const index = this.collection().findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this.collection()[index] = {
      ...this.collection()[index],
      ...payload,
      id
    };

    return clone(this.collection()[index]);
  }

  remove(id) {
    const index = this.collection().findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const [removed] = this.collection().splice(index, 1);
    return clone(removed);
  }
}

export default BaseModel;
