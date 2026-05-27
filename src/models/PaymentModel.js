import { db } from "../data/store.js";
import { clone, createId } from "../utils/helpers.js";

class PaymentModel {
  all(type) {
    if (!type) {
      return clone(db.payments);
    }

    return clone(db.payments[type] || []);
  }

  create(type, payload) {
    if (!db.payments[type]) {
      return null;
    }

    const record = {
      id: createId(`${type}-payment`),
      ...payload
    };

    db.payments[type].unshift(record);
    return clone(record);
  }
}

export default new PaymentModel();
