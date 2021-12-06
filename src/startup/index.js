const express = require('express');

class AppServer {
  constructor({ Setting, RouterApp }) {
    this._setting = Setting;
    this._app = express().use(RouterApp);
  }

  get app() {
    return this._app;
  }

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
