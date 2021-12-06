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
}

module.exports = UserService;
