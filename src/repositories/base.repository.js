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

  /**
   * List all entity from model
   *
   * @async
   * @param {Object} [filter={}] object filter to want apply to get query, example: find({})
   * @param {Number} [limit=25] number limit to get data
   * @param {Number} [page=1] pagination number
   * @param {String|null} [sort=null] string name to sort query
   * @returns {Promise<Array.<Model>>} return entity models array
   */
  async list(filter = {}, limit = 25, page = 1, sort = null) {
    const skip = limit * (page - 1);
    if (sort === null) return await this.model.find().skip(skip).limit(limit);
    return await this.model.find(filter).skip(skip).limit(limit).sort(sort);
  }

  /**
   * Retrieve a entity by id
   *
   * @async
   * @param {String} id string represent a ObjectId of entity to retrieve
   * @returns {Promise<Object>} return a promise with entity object
   */
  async retrieve(id) {
    return await this.model.findById(id);
  }

  /**
   * Create a new entity
   *
   * @async
   * @param {Object} entity object to represent a entity that you want to save
   * @returns {Promise<Model>} return entity that was created
   */
  async create(entity) {
    return await this.model.create(entity);
  }

  /**
   * Find and update an existing entity
   *
   * @async
   * @param {String} id string represent a ObjectId of entity to update
   * @param {Object} entity object with attrs you want update
   * @returns {Promise<Model|void>} returns a promise with entity that was updated
   */
  async update(id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Delete a entity by id
   *
   * @async
   * @param {String} id string represent a ObjectId of entity to delete
   * @returns {Promise<Boolean>} return boolean value if entity was deleted
   */
  async delete(id) {
    await this.model.findByIdAndDelete(id);
    return true;
  }
}
module.exports = BaseRepository;
