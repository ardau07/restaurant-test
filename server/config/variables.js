const dotenv = require('dotenv');

dotenv.config();

const {
  PORT,
  JWT_SECRET,
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  DB_NAME,
  DB_LOGGING,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  DB_NAME,
  DB_LOGGING,
};
