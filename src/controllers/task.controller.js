/**
 * Task controller module
 * @module Controllers
 */
const Response = require('./../core/response');

// private module variable
let _taskService = null;
/**
 * Class represent task controller handler
 */
class TaskController {
  /**
   * Task Controller
   * @param {object} dependency Dependency injections
   * @param {Object} dependency.TaskService Task service object
   */
  constructor({ TaskService }) {
    _taskService = TaskService;
  }

  /**
   * List tasks exists handler
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
      const data = await _taskService.list({}, limit, page, '-created');
      return new Response(data).send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieve a task exist handler
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
      const task = await _taskService.retrieve(id);
      return new Response(task).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Create a new task handler
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
      const data = await _taskService.create(body);
      return new Response(data, 'Task created successfully', 201).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Update a task exist handler
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
      const data = await _taskService.update(id, body);
      return new Response(data, 'Task updated successfully').send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a task exist handler
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
        await _taskService.delete(id),
        'Task deleted successfully'
      ).send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Pause a running task
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async pause(req, res, next) {
    try {
      const { id } = req.params;
      const data = await _taskService.pause(id);
      return new Response(data, 'Task paused successfully').send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Restart a running task
   *
   * @async
   * @param {Object} req req express request object
   * @param {Object} res res express response object
   * @param {Function} next next express middleware function to catch error
   * @returns {Promise} Promise object represent http express response
   */
  async restart(req, res, next) {
    try {
      const { id } = req.params;
      const data = await _taskService.restart(id);
      return new Response(data, 'Task restarted successfully').send(res);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
