import { db } from "../data/store.js";
import { clone, createId } from "../utils/helpers.js";

class LoadModel {
  all() {
    return clone(db.loads);
  }

  create(direction, payload) {
    const collection = db.loads[direction];

    if (!collection) {
      return null;
    }

    const record = {
      id: createId(`${direction}-load`),
      ...payload
    };

    collection.unshift(record);
    return clone(record);
  }
}

export default new LoadModel();
