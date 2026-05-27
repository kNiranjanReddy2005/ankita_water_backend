import { getStateValue, patchStateValue } from "../data/store.js";

class SingletonModel {
  constructor(key) {
    this.key = key;
  }

  async get() {
    return getStateValue(this.key);
  }

  async update(payload) {
    return patchStateValue(this.key, payload);
  }
}

export default SingletonModel;
