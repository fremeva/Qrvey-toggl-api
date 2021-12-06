/**
 * Project repository module
 * @module Repositories
 */
const BaseRepository = require('./base.repository');

/**
 * Class represent methods allowed to manipulate the data to Project model
 */
class ProjectRepository extends BaseRepository {
  /**
   * Project repository
   * @param {Object} dependency Dependency injections
   * @param {Model} dependency.Project Mongoose model project
   */
  constructor({ Project }) {
    super(Project);
  }
}

module.exports = ProjectRepository;
