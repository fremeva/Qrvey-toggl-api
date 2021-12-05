const mongoose = require('mongoose');

const Settings = require('./src/settings');

mongoose
  .connect(Settings.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(console.error);
