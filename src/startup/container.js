const { createContainer, asClass, asFunction, asValue } = require('awilix');

// App
const AppServer = require('.');
// Settings
const Setting = require('./../settings');
// Models
const { Project, Task, TrackingTimeTask, User } = require('./../models');
// Repositories
const {
  ProjectRepository,
  TaskRepository,
  TrackingTimeTaskRepository,
  UserRepository
} = require('./../repositories');
// Services
// Controllers
// Routes
const routerApp = require('./../routes');

// Create awilix container
const container = createContainer();

container
  .register({
    AppServer: asClass(AppServer).singleton(),
    Setting: asValue(Setting)
  })
  .register({
    Project: asValue(Project),
    Task: asValue(Task),
    TrackingTimeTask: asValue(TrackingTimeTask),
    User: asValue(User)
  })
  .register({
    ProjectRepository: asClass(ProjectRepository).singleton(),
    TaskRepository: asClass(TaskRepository).singleton(),
    TrackingTimeTaskRepository: asClass(TrackingTimeTaskRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton()
  })
  .register({})
  .register({})
  .register({
    RouterApp: asFunction(routerApp).singleton()
  });

module.exports = container;
