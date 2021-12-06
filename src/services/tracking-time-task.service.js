/**
 * Tracking Time Task services module
 * @module Services
 */
const BaseService = require('./base.service');

/**
 * Class represent methods allowed to interact with Tracking time task repository
 */
class TrackingTimeTaskService extends BaseService {
  /**
   * Tracking Time Task service
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.TrackingTimeTaskRepository Tracking time task repository object
   */
  constructor({ TrackingTimeTaskRepository }) {
    super(TrackingTimeTaskRepository);
  }
}

module.exports = TrackingTimeTaskService;
