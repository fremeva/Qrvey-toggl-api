const { createContainer, asClass, asFunction, asValue } = require('awilix');

// App
const AppServer = require('.');
// Settings
const Setting = require('./../settings');
// Repositories
// Services
// Controllers
// Routes

// Create awilix container
const container = createContainer();

container.register({
  AppServer: asClass(AppServer).singleton(),
  Setting: asValue(Setting),
  TempFunc: asFunction(() => undefined)
});

module.exports = container;
