/**
 * Class represent a response API data to client
 */
class Response {
  /**
   *
   * @param {Array|Object|String} data data response to client
   * @param {String} message Description message response
   * @param {Number} status Number status response.
   */
  constructor(data, message, status = 200) {
    this.data = data || {};
    this.status = status || 200;
    this.message = message || 'Request was resolved successfully';
  }

  /**
   * Wrapper from response send or json method and return response.
   *
   * @param {Object} res Express response object reference
   * @returns {Object} Return response express object
   */
  send(res) {
    return res.status(this.status).json(this);
  }
}

module.exports = Response;
