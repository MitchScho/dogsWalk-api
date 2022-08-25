'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};
const db = require('../db');

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// const userModel = require('./User');
const walksModel = require('./Walk');
const dogsModel = require('./Dog');

const models = {
  walk: db.walksModel,
  dog: db.dogsModel,

}
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
  // .forEach(file => {
  //   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  //   db[model.name] = model;
  // });
// console.log("model in model index", models);
// Object.keys(models).forEach(modelName => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

models.sequelize = db;
// models.Sequelize = Sequelize;

module.exports = models;
