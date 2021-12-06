require('dotenv').config();

module.exports = {
  // Application
  APP_NAME: process.env.APP_NAME || 'App',
  PORT: process.env.PORT || 3000,
  DEBUG: Boolean(process.env.DEBUG) || false,

  // Databases
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27020/mydb',

  // Authentication & Security

  // jsonwebtoken
  JWT_PREFIX: process.env.Bearer,
  JWT_SECRET_ACCESS_KEY:
    process.env.JWT_SECRET_ACCESS_KEY || '*secrect####jwt####key==*',
  JWT_SECRET_REFRESH_KEY:
    process.env.JWT_SECRET_REFRESH_KEY || '*secrect####jwt####key==*',
  JWT_ACCESS_EXPIRED_IN: process.env.JWT_ACCESS_EXPIRED_IN || '1h',
  JWT_REFRESH_EXPIRED_IN: process.env.JWT_REFRESH_EXPIRED_IN || '24h'
};
