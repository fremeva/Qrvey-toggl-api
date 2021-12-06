/**
 * Task repository module
 * @module Repositories
 */
const BaseRepository = require('./base.repository');

/**
 * Class represent methods allowed to manipulate the data to Task model
 */
class TaskRepository extends BaseRepository {
  /**
   * Task repository
   * @param {Object} dependency Dependency injections
   * @param {Model} dependency.Task Mongoose model Task
   */
  constructor({ Task }) {
    super(Task);
  }
}

module.exports = TaskRepository;
