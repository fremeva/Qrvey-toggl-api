/**
 * User controller module
 * @module Controllers
 */
const Response = require('./../core/response');

// private module variable
let _userService = null;
/**
 * Class represent user controller handler
 */
class UserController {
  /**
   * User Controller
   * @param {object} dependency Dependency injections
   * @param {Object} dependency.UserService User service object
   */
  constructor({ UserService }) {
    _userService = UserService;
  }

  /**
   * List users exists handler
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
      const data = await _userService.list({}, limit, page, '-created');
      return new Response(data).send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retrieve a user exist handler
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
      const user = await _userService.retrieve(id);
      return new Response(user).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Create a new user handler
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
      const data = await _userService.create(body);
      return new Response(data, 'User created successfully', 201).send(res);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Update a user exist handler
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
      const data = await _userService.update(id, body);
      return new Response(data, 'User updated successfully').send(res);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a user exist handler
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
        await _userService.delete(id),
        'User deleted successfully'
      ).send(res);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
