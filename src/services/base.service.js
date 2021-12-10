/**
 * Base services module
 * @module Services
 */

const _ = require('lodash');
const {
  Types: { ObjectId }
} = require('mongoose');

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

  async list(filter = {}, limit = 25, page = 1, sort = null) {
    if (isNaN(page)) page = 1;
    if (isNaN(limit)) limit = 50;
    return await this.repository.list(filter, limit, page, sort);
  }
  async retrieve(id) {
    if (!id) {
      throw Error('id is required');
    }
    if (!ObjectId.isValid(id)) {
      throw Error(`${id} is not valid id`);
    }
    const document = await this.repository.retrieve(id);
    if (!document) {
      // TODO: Must be Improvement
      const error = new Error();
      error.status = 404;
      error.message = 'entity does not found';
      throw error;
    }

    return document;
  }
  async create(entity) {
    if (!_.isObject(entity) || _.isEmpty(entity)) {
      throw new Error('entity must be not empty object');
    }
    return await this.repository.create(entity);
  }
  async update(id, entity) {
    if (!id) {
      throw Error('id is required');
    }
    if (!ObjectId.isValid(id)) {
      throw Error(`${id} is not valid id`);
    }
    if (!_.isObject(entity) || _.isEmpty(entity)) {
      throw new Error('entity must be not empty object');
    }
    await this.retrieve(id); // Validate user by id
    return await this.repository.update(id, entity);
  }
  async delete(id) {
    if (!id) {
      throw Error('id is required');
    }
    if (!ObjectId.isValid(id)) {
      throw Error(`${id} is not valid id`);
    }
    await this.retrieve(id); // Validate user by id
    return await this.repository.delete(id);
  }
}
module.exports = BaseService;
