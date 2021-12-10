/**
 * Exceptions API class
 * @module Core
 */

/**
 * Class represent API server error base
 * @extends Error
 */
class ServerError extends Error {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=500] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = 500, data = {}) {
    message = message || 'A server error occurred. Please contact with support';
    super(message);
    this.error = message;
    this.name = 'ServerError';
    this.status = status || 500;
    this.data = data || {};
  }
}

/**
 * Class represent bad request error
 * @extends ServerError
 */
class BadRequestError extends ServerError {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=400] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = null, data = {}) {
    message = message || 'Malformed request';
    status = status || 400;
    super(message, status, data);
    this.name = 'BadRequestError';
  }
}

/**
 * Class represent forbidden request error
 * @extends ServerError
 */
class ForbiddenRequestError extends ServerError {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=403] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = null, data = {}) {
    message = message || 'Request is valid, but the server is refusing action';
    status = status || 403;
    super(message, status, data);
    this.name = 'ForbiddenRequestError';
  }
}

/**
 * Class represent not acceptable request error
 * @extends ServerError
 */
class NotAcceptableError extends ServerError {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=406] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = null, data = {}) {
    message = message || 'Could not satisfy the request accept header';
    status = status || 406;
    super(message, status, data);
    this.name = 'NotAcceptableError';
  }
}

/**
 * Class represent not authentication API request error
 * @extends ServerError
 */
class NotAuthenticatedError extends ServerError {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=401] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = null, data = {}) {
    message = message || 'Authentication credentials were not provided';
    status = status || 401;
    super(message, status, data);
    this.name = 'NotAuthenticatedError';
  }
}

/**
 * Class represent not found API path request error
 * @extends ServerError
 */
class NotFoundError extends ServerError {
  /**
   * @param {string} [message=""] Message detail error
   * @param {Number} [status=404] Http Status error number
   * @param {Object} [data={}] Data detail object error descriptor
   */
  constructor(message = '', status = null, data = {}) {
    message = message || 'Resource not found';
    status = status || 404;
    super(message, status, data);
    this.name = 'NotFoundError';
  }
}

/**
 * Class represent Token request expired authenntication error
 * @extends NotAuthenticatedError
 */
class TokenExpiredError extends NotAuthenticatedError {
  /**
   * @param {string} [message="Token expired"] Message detail error
   */
  constructor(message = '') {
    message = message || 'Token expired';
    super(message, null, null);
    this.name = 'TokenExpiredError';
  }
}

module.exports = {
  ServerError,
  BadRequestError,
  ForbiddenRequestError,
  NotAcceptableError,
  NotAuthenticatedError,
  NotFoundError,
  TokenExpiredError
};
