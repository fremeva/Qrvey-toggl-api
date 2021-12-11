/**
 * Base services module
 * @module Services
 */

const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');

const { BadRequestError, NotFoundError } = require('../core/exceptions');

/**
 * Class represent Base methods allowed to interact with repository
 */
class BaseService {
  /**
   * Abstract class to expose common methods to interact with repository
   * @param {Object} repository Repository instance
   */
  constructor(repository) {
    this.repository = repository;
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
    if (isNaN(page)) {
      page = 1;
    }
    if (isNaN(limit)) {
      limit = 50;
    }
    return await this.repository.list(filter, limit, page, sort);
  }

  /**
   * Retrieve a entity by id
   *
   * @async
   * @param {String} id string represent a ObjectId of entity to retrieve
   * @returns {Promise<Object>} return a promise with entity object
   */
  async retrieve(id) {
    if (!id) {
      throw new BadRequestError('id params is required');
    }
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError(`${id} is not valid id`);
    }
    const document = await this.repository.retrieve(id);
    if (!document) {
      throw new NotFoundError();
    }
    return document;
  }

  /**
   * Create a new entity
   *
   * @async
   * @param {Object} entity object to represent a entity that you want to save
   * @returns {Promise<Model>} return entity that was created
   */
  async create(entity) {
    if (!_.isObject(entity) || _.isEmpty(entity)) {
      throw new BadRequestError('entity must be not empty to create');
    }
    return await this.repository.create(entity);
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
    if (!id) {
      throw new BadRequestError('id params is required');
    }
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError(`${id} is not valid id`);
    }
    if (!_.isObject(entity) || _.isEmpty(entity)) {
      throw new BadRequestError('entity must be not empty to update');
    }
    await this.retrieve(id); // Validate user by id
    return await this.repository.update(id, entity);
  }

  /**
   * Delete a entity by id
   *
   * @async
   * @param {String} id string represent a ObjectId of entity to delete
   * @returns {Promise<Boolean>} return boolean value if entity was deleted
   */
  async delete(id) {
    if (!id) {
      throw new BadRequestError('id params is required');
    }
    if (!ObjectId.isValid(id)) {
      throw new BadRequestError(`${id} is not valid id`);
    }
    await this.retrieve(id); // Validate user by id
    return await this.repository.delete(id);
  }
}
module.exports = BaseService;
