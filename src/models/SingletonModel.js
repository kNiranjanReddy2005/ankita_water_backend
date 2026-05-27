import { db } from "../data/store.js";
import { clone } from "../utils/helpers.js";

class SingletonModel {
  constructor(key) {
    this.key = key;
  }

  get() {
    return clone(db[this.key]);
  }

  update(payload) {
    db[this.key] = {
      ...db[this.key],
      ...payload
    };

    return clone(db[this.key]);
  }
}

export default SingletonModel;
