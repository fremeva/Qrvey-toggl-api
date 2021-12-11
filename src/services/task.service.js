/**
 * Task services module
 * @module Services
 */
const BaseService = require('./base.service');
const { STATUS_TASK } = require('./../core/constant');
const { BadRequestError } = require('./../core/exceptions');

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

  /**
   * Pause a task is running
   *
   * @async
   * @param {string|ObjectId} id ObjectId task to want pause
   * @returns {Promise<Object>} return a promise object was paused
   */
  async pause(id) {
    const task = await this.retrieve(id);
    if (task.status !== STATUS_TASK.RUNNING) {
      throw new BadRequestError('Task must be running to paused');
    } else {
      await this.update(task._id, { status: STATUS_TASK.PAUSED });
      return await this.retrieve(task._id); // return current document with all data updated
    }
  }
  /**
   * Restart a task was paused
   *
   * @async
   * @param {string|ObjectId} id ObjectId task to want restart
   * @returns return a promise object was restarted
   */
  async restart(id) {
    const task = await this.retrieve(id);
    if (task.status !== STATUS_TASK.PAUSED) {
      throw new BadRequestError('Task must be paused to restart');
    } else {
      await this.update(task._id, { status: STATUS_TASK.RUNNING });
      return await this.retrieve(task._id); // return current document with all data updated
    }
  }

  /**
   * Create a new entity
   *
   * @override
   * @async
   * @param {Object} entity object to represent a entity that you want to save
   * @returns {Promise<Model>} return entity that was created
   */
  async create(entity) {
    const { _id } = await super.create(entity);
    return await this.retrieve(_id); // return current document with all data updated
  }

  /**
   * Find and update an existing entity
   *
   * @override
   * @async
   * @param {String} id string represent a ObjectId of entity to update
   * @param {Object} entity object with attrs you want update
   * @returns {Promise<Model|void>} returns a promise with entity that was updated
   */
  async update(id, entity) {
    const { _id } = await super.update(id, entity);
    return await this.retrieve(_id); // return current document with all data updated
  }
}

module.exports = TaskService;
