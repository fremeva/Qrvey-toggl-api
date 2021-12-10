const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

module.exports = ({ Setting, UserRouter }) => {
  const router = express.Router().use(helmet()).use(compression());
  const APIRouter = express.Router().use(express.json()).use(cors());

  // Adding Global Router
  router.get('/', (req, res) =>
    res.send(`Welcome to Aplication ${Setting.APP_NAME}`)
  ); // Temporal router handler

  // Adding API Routers
  APIRouter.get('/', (req, res) =>
    res.status(200).json({ greeting: `Welcome ${Setting.APP_NAME} [API REST]` })
  ); // Temporal API router handler;
  APIRouter.use('/users', UserRouter); // Users router handler
  router.use('/api/v1', APIRouter);

  return router;
};
