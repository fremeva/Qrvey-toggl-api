/**
 * Project controller module
 * @module Controllers
 */
const Response = require('./../core/response');

// private module variable
let _projectService = null;
/**
 * Class represent project controller handler
 */
class ProjectController {
  /**
   * Project Controller
   * @param {object} dependency Dependency injections
   * @param {Object} dependency.ProjectService Project service object
   */
  constructor({ ProjectService }) {
    _projectService = ProjectService;
  }

  /**
   * List projects exists handler
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async list(req, res, next) {
    try {
      const { query: page, limit } = req;
      const data = await _projectService.list({}, limit, page, '-created');
      return new Response(data).send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieve a project exist handler
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async retrieve(req, res, next) {
    try {
      const { id } = req.params;
      const project = await _projectService.retrieve(id);
      return new Response(project).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Create a new project handler
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async create(req, res, next) {
    try {
      const { body } = req;
      const data = await _projectService.create(body);
      return new Response(data, 'Project created successfully', 201).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Update a project exist handler
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const data = await _projectService.update(id, body);
      return new Response(data, 'Project updated successfully').send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a project exist handler
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      return new Response(
        await _projectService.delete(id),
        'Project deleted successfully'
      ).send(res);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;
