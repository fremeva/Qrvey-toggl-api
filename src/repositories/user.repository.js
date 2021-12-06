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
}

module.exports = UserRepository;
