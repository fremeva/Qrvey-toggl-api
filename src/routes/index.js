const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const {
  APIErrorHandlerMiddleware,
  NotFoundJsonResponseMiddleware
} = require('./../middlewares');

module.exports = ({ Setting, ProjectRouter, TaskRouter, UserRouter }) => {
  const router = express.Router().use(helmet()).use(compression());
  const APIRouter = express.Router().use(express.json()).use(cors());

  // Adding Global Router
  router.get('/', (req, res) =>
    res.send(`Welcome to Aplication ${Setting.APP_NAME}`)
  ); // Temporal router handler

  // Adding API Routers
  APIRouter.use('/users', UserRouter); // Users router handler
  APIRouter.use('/projects', ProjectRouter); // Projects router handler
  APIRouter.use('/tasks', TaskRouter); // Tasks router handler

  // Middleware catch
  APIRouter.use(NotFoundJsonResponseMiddleware).use(APIErrorHandlerMiddleware);

  router.use('/api/v1', APIRouter);

  return router;
};
