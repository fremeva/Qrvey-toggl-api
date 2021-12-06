/**
 * Project services module
 * @module Services
 */
const BaseService = require('./base.service');

/**
 * Class represent methods allowed to interact with project repository
 */
class ProjectService extends BaseService {
  /**
   * Project service
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.ProjectRepository Project repository object
   */
  constructor({ ProjectRepository }) {
    super(ProjectRepository);
  }
}

module.exports = ProjectService;
