/**
 * User repository module
 * @module Repositories
 */
const BaseRepository = require('./base.repository');

/**
 * Class represent methods allowed to manipulate the data to User model
 */
class UserRepository extends BaseRepository {
  /**
   * User repository
   * @param {Object} dependency Dependency injections
   * @param {Model} dependency.User Mongoose model User
   */
  constructor({ User }) {
    super(User);
  }

  /**
   * Retrieve a User by any field
   *
   * @async
   * @param {String} field Field name to retrieve
   * @param {any} value Value to retrieve
   * @returns {Promise<Object>} return a promise with user document object found
   */
  async retrieveUserByField(field, value) {
    return await this.model.findOne({ [field]: value });
  }
}

module.exports = UserRepository;
