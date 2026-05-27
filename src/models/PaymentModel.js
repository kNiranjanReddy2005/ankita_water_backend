import { createRecord, getStateValue } from "../data/store.js";

class PaymentModel {
  async all(type) {
    if (!type) {
      return getStateValue("payments");
    }

    return (await getStateValue(`payments.${type}`)) || [];
  }

  async create(type, payload) {
    const payments = await getStateValue("payments");

    if (!payments?.[type]) {
      return null;
    }

    return createRecord(`payments.${type}`, `${type}-payment`, payload);
  }
}

export default new PaymentModel();
