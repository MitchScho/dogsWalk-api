// 'use strict';

//MORE COMPLICATED VERSION

// // const Sequelize = require('sequelize');

// New Sequelize Instance- Database Connection
const Sequelize = require('sequelize');
const sequelize = require('../db');
const Dog = require('./Dog');
const Walk = require('./Walk');
console.log("sequelize in models index", sequelize);
console.log("Model Index");

//-----------------------------------------------------------------------------
//Associations using basic associations

Walk.belongsToMany(Dog, { through: 'walks_dogs', foreignKey: 'walk_id' });

//------------------------------------------------------------------------------
// Basic association syntax
Dog.belongsToMany(Walk, { through: 'walks_dogs', foreignKey: 'dog_id' });



//---------------------------------------------------------------------------
// // Require Model files for new db object
// const usersModel = require('./User');
// const walksModel = require('./Walk');
// const dogsModel = require('./Dog');
// const walksdogsModel = require('./WalkDog');

// console.log("sequelize-----", sequelize);
// console.log("dogs model-----", sequelize.dogsModel);

// const db = {
//   Walk: sequelize.walksModel,
//   Dog: sequelize.dogsModel,
//   User:sequelize.usersModel,
//   WalkDog: sequelize.walksdogsModel,
// }


//----------------------------------------------------------------------------
// Require Model files for new db object

// console.log("sequelize-----", sequelize);


// const db = {
//   Walk: require('./Walk')(sequelize, Sequelize),
//   Dog: require('./Dog')(sequelize, Sequelize),
//   User: require('./User')(sequelize, Sequelize),
//   WalkDog: require('./WalkDog')(sequelize, Sequelize),
// }

//--------------------------------------------------------------------------------
// console.log("models db", db);

// Object.keys(db).forEach(modelName => {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// // models.Sequelize = Sequelize;
// console.log("model.sequelize db", sequelize);



//----------------------------------------------------------------------------------

//SIMPLER VERSION


// const Walk = require('./Walk');
// const Dog = require('./Dog');

// Dog.belongsToMany(Walk, { through: 'walks_dogs', foreignKey: 'dog_id' });

// Walk.belongsToMany(Dog, { through: 'walks_dogs', foreignKey: 'walk_id' });

module.exports = db;
