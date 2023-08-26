const Sequelize = require("sequelize");
const getNoteModel = require("./note");
const getTagModel = require("./tag");
const getNoteTagModel = require("./notetag");

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
  Tag: getTagModel(sequelize, Sequelize),
  NoteTag: getNoteTagModel(sequelize,Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {sequelize, models};
