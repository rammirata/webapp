module.exports = class BaseService {
  Payload = null;

  constructor(Model) {
    this.Model = Model;
  }

  init(payload) {
    this.Payload = payload;
    return this;
  }

  create(payload) {
    payload = payload || this.Payload;
    return new Promise((resolve, reject) => {
      this.Model.insertMany(payload)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  get(queryObj, populateFields, sortOptions) {
    return new Promise((resolve, reject) => {
      this.Model.find(queryObj)
        .sort(sortOptions)
        .populate(populateFields)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  getOne(queryObj) {
    return new Promise((resolve, reject) => {
      this.Model.find(queryObj)
        .then(([res]) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  update(filter, data) {
    data = data || this.Payload;
    return new Promise((resolve, reject) => {
      this.Model.updateMany(filter, data, { new: true })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  delete(ids) {
    return new Promise((resolve, reject) => {
      this.Model.deleteMany({ _id: { $in: ids } })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  bulkUpdate(filters, bulkData, upsert=false) {
    const operations = bulkData.map((data, i) => {
      const singleOp = {
        'updateOne': {
          'filter': filters[i],
          'update': { '$set': data },
          'upsert': upsert,
        }
      };
      return singleOp;
    })
    // console.log('operations ', operations)
    console.log('bulk update documents ', operations.length);
    return this.Model.collection.bulkWrite(operations);
  }
};
