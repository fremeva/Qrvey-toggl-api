/**
 * Module represent the entry point to access all repositories.
 * @module Repositories
 * @type {Object}
 *
 */

module.exports = {
  ProjectRepository: require('./project.repository'),
  TaskRepository: require('./task.repository'),
  TrackingTimeTaskRepository: require('./tracking-time-task.repository'),
  UserRepository: require('./user.repository')
};
