const mongoose = require('mongoose');
const container = require('./src/startup/container');

// Resolve dependency from container
const Setting = container.resolve('Setting');
const AppServer = container.resolve('AppServer');

mongoose
  .connect(Setting.MONGO_URI)
  .then(() => AppServer.run())
  .catch(console.error);
