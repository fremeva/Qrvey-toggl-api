const { createContainer, asClass, asFunction, asValue } = require('awilix');

// App
const AppServer = require('.');
// Settings
const Setting = require('./../settings');
// Repositories
// Services
// Controllers
// Routes
const routerApp = require('./../routes');

// Create awilix container
const container = createContainer();

container
  .register({
    AppServer: asClass(AppServer).singleton(),
    Setting: asValue(Setting),
    TempFunc: asFunction(() => undefined)
  })
  .register({
    RouterApp: asFunction(routerApp).singleton()
  });

module.exports = container;
