import { createRecord, getStateValue } from "../data/store.js";

class LoadModel {
  async all() {
    return getStateValue("loads");
  }

  async create(direction, payload) {
    const loads = await getStateValue("loads");

    if (!loads?.[direction]) {
      return null;
    }

    return createRecord(`loads.${direction}`, `${direction}-load`, payload);
  }
}

export default new LoadModel();
