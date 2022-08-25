'use strict';

// const Sequelize = require('sequelize');
const db = require('../db');


const usersModel = require('./User');
const walksModel = require('./Walk');
const dogsModel = require('./Dog');

const models = {
  walk: db.walksModel,
  dog: db.dogsModel,
  user:db.userModel,

}

// Object.keys(models).forEach(modelName => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

models.sequelize = db;
// models.Sequelize = Sequelize;

module.exports = models;
