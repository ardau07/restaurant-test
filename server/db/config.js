const {
  DB_NAME,
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  DB_LOGGING,
} = require('../config/variables');

module.exports = {
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: DB_NAME,
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  logging: DB_LOGGING || false,
};
