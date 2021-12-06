/**
 * Base repository module
 * @module Repositories
 */

/**
 * Class represent Base methods allowed to manipulate the data
 */
class BaseRepository {
  /**
   * Abstract class to expose common methods to manipulated data
   * @param {Model} model Mongoose model
   */
  constructor(model) {
    this.model = model;
  }

  async list(filter = {}, limit = 25, page = 1, sort = null) {
    const skip = limit * (page - 1);
    if (sort === null) return await this.model.find().skip(skip).limit(limit);
    return await this.model.find(filter).skip(skip).limit(limit).sort(sort);
  }
  async retrieve(id) {
    return await this.model.findById(id);
  }
  async create(entity) {
    return await this.model.create(entity);
  }
  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }
  async delete(id) {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}
module.exports = BaseRepository;
