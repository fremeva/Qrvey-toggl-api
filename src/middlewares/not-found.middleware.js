/**
 * Not found JSON Response error middleware module
 * @module Middlewares
 */
const { NotFoundError } = require('./../core/exceptions');

/**
 * Not Found Middleware Handler Response
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Promise<Object>} return Promise response object with NotFoundError object
 */
// eslint-disable-next-line no-unused-vars
const NotFoundJsonResponseMiddleware = (req, res) => {
  const err = new NotFoundError();
  res.status(err.status).json(err);
};

module.exports = NotFoundJsonResponseMiddleware;
