const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

// Define sequelize connection
const { DB_NAME, PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${DB_NAME}`,
  {
    logging: false,
  }
);

const db = {};

// Import models
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') > 0 && file !== 'index.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = Object.assign(
  {},
  {
    sequelize,
    Sequelize,
  },
  db
);
