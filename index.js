const mongoose = require('mongoose');

const container = require('./src/startup/container');

// Resolve dependency
const Setting = container.resolve('Setting');

mongoose
  .connect(Setting.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(console.error);
