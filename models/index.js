// 'use strict';

// // const Sequelize = require('sequelize');
const db = require('../db');

console.log("Model Index");


// const usersModel = require('./User');
// const walksModel = require('./Walk');
// const dogsModel = require('./Dog');
// const User = require('./User');
const Walk = require('./Walk');
const Dog = require('./Dog');

// const models = {
//   walk: db.walksModel,
//   dog: db.dogsModel,
//   user:db.userModel,
Dog.belongsToMany(Walk, { through: 'walks_dogs', foreignKey: 'dog_id' });

Walk.belongsToMany(Dog, { through: 'walks_dogs', foreignKey: 'walk_id' });
// }
// console.log("models", models);

// Object.keys(models).forEach(modelName => {
//   if ('associate' in models[modelName]) {
//     models[modelName].associate(models);
//   }
// });

// models.sequelize = db;
// // models.Sequelize = Sequelize;
// console.log("model.sequelize db", db);

//Sync Models
  // db.sync({alter: true})
  //   console.log("All models were synchronized successfully.");

// module.exports = models;
