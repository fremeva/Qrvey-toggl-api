/**
 * User services module
 * @module Services
 */
const BaseService = require('./base.service');

/**
 * Class represent methods allowed to interact with User repository
 */
class UserService extends BaseService {
  /**
   * User service
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.UserRepository User repository object
   */
  constructor({ UserRepository }) {
    super(UserRepository);
  }

  /**
   * Get a User by username field
   *
   * @async
   * @param {String} username Username value to retrieve User
   * @returns
   */
  async getUserByUsername(username) {
    return await this.repository.retrieveUserByField('username', username);
  }
}

module.exports = UserService;
