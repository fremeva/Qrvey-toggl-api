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
const {
  AuthService,
  ProjectService,
  TaskService,
  TrackingTimeTaskService,
  UserService
} = require('./../services');
// Controllers
const {
  UserController,
  ProjectController,
  TaskController
} = require('./../controllers');
// Routes
const routerApp = require('./../routes');
const {
  ProjectRouter,
  TaskRouter,
  UserRouter
} = require('./../routes/index.router');

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
  .register({
    AuthService: asClass(AuthService).singleton(),
    ProjectService: asClass(ProjectService).singleton(),
    TaskService: asClass(TaskService).singleton(),
    TrackingTimeTaskService: asClass(TrackingTimeTaskService).singleton(),
    UserService: asClass(UserService).singleton()
  })
  .register({
    UserController: asClass(UserController).singleton(),
    ProjectController: asClass(ProjectController).singleton(),
    TaskController: asClass(TaskController).singleton()
  })
  .register({
    ProjectRouter: asFunction(ProjectRouter).singleton(),
    RouterApp: asFunction(routerApp).singleton(),
    TaskRouter: asFunction(TaskRouter).singleton(),
    UserRouter: asFunction(UserRouter).singleton()
  });

module.exports = container;
