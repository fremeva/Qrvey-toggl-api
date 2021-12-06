/**
 * Task services module
 * @module Services
 */
const BaseService = require('./base.service');

/**
 * Class represent methods allowed to interact with Task repository
 */
class TaskService extends BaseService {
  /**
   * Task service
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.TaskRepository Task repository object
   */
  constructor({ TaskRepository }) {
    super(TaskRepository);
  }
}

module.exports = TaskService;
