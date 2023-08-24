const Sequelize = require("sequelize");
const getNoteModel = require("./note");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const models = {
  Note: getNoteModel(sequelize, Sequelize),
};

module.exports = {sequelize, models};
