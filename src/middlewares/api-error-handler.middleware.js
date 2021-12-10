/**
 * APIError middleware module
 * @module Middlewares
 *
 */

/**
 *  API Error handler middleware
 *
 * @param {Object} err Error Exception to Catch
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @param {Function} next Express next middleware function
 */
// eslint-disable-next-line no-unused-vars
const APIErrorHandlerMiddleware = async (err, req, res, next) => {
  err.status = err.status || 500;
  err.error = err.message || 'A server error occurred';

  res.status(err.status).json(err);
};

module.exports = APIErrorHandlerMiddleware;
