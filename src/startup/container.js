const { createContainer, asClass, asFunction, asValue } = require('awilix');

// App
const App = require('.');
// Settings
const Setting = require('./../settings');
// Repositories
// Services
// Controllers
// Routes

// Create awilix container
const container = createContainer();

container.register({
  App: asClass(App).singleton(),
  Setting: asValue(Setting),
  TempFunc: asFunction(() => undefined)
});

module.exports = container;
