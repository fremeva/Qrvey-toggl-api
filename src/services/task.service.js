/**
 * Task services module
 * @module Services
 */
const BaseService = require('./base.service');
const { STATUS_TASK } = require('./../core/constant');

/**
 * Class represent methods allowed to interact with Task repository
 * @extends BaseService
 */
class TaskService extends BaseService {
  /**
   * Task service
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.TaskRepository Task repository object
   */
  constructor({ TaskRepository, TrackingTimeTaskRepository }) {
    super(TaskRepository);
    this.trackingTimeTaskRepository = TrackingTimeTaskRepository;
  }

  async create(entity) {
    const task = await super.create(entity);
    const { status, _id } = task;
    if (status === STATUS_TASK.RUNNING) {
      await this.trackingTimeTaskRepository.create({ task: _id });
    }
    return task;
  }
}

module.exports = TaskService;
