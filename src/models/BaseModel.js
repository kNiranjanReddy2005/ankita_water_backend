import { createRecord, findRecordById, listRecords, removeRecord, updateRecord } from "../data/store.js";

class BaseModel {
  constructor(collectionName, idPrefix) {
    this.collectionName = collectionName;
    this.idPrefix = idPrefix;
  }

  async all() {
    return listRecords(this.collectionName);
  }

  async findById(id) {
    return findRecordById(this.collectionName, id);
  }

  async create(payload) {
    return createRecord(this.collectionName, this.idPrefix, payload);
  }

  async update(id, payload) {
    return updateRecord(this.collectionName, id, payload);
  }

  async remove(id) {
    return removeRecord(this.collectionName, id);
  }
}

export default BaseModel;
