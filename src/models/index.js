/**
 * Module represent the entry point to access all models.
 * @module Models
 * @type {Object}
 *
 */

module.exports = {
  Project: require('./project.model'),
  Task: require('./task.model'),
  TrackingTimeTask: require('./tracking-time-task'),
  User: require('./user.model')
};
