const express = require('express');

/**
 * Class represent a express server application
 */
class AppServer {
  /**
   * Create and configure express server application
   * @param {Object} dependency Dependency injections
   * @param {Object} dependency.Setting Setting object has all enviroments and configuration var
   * @param {express.Router} dependency.RouterApp All routes to application
   */
  constructor({ Setting, RouterApp }) {
    this._setting = Setting;
    this._app = express().use(RouterApp);
  }

  /**
   * Get app value
   * @return {express.Application} The app express instance.
   */
  get app() {
    return this._app;
  }

  /**
   * Run express server application
   *
   * @async
   */
  async run() {
    this._app.listen(this._setting.PORT, (err) => {
      if (err) throw new Error(err);
      console.log(
        `${this._setting.APP_NAME} Running on port ${this._setting.PORT}`
      );
    });
  }
}

module.exports = AppServer;
