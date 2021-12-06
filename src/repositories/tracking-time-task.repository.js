/**
 * Tracking time task repository module
 * @module Repositories
 */
const BaseRepository = require('./base.repository');

/**
 * Class represent methods allowed to manipulate the data to Tracking Time Task model
 */
class TrackingTimeTaskRepository extends BaseRepository {
  /**
   * TrackingTimeTask repository
   * @param {Object} dependency Dependency injections
   * @param {Model} dependency.TrackingTimeTask Mongoose model Tracking Time Task
   */
  constructor({ TrackingTimeTask }) {
    super(TrackingTimeTask);
  }
}

module.exports = TrackingTimeTaskRepository;
