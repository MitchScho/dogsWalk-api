const {Sequelize, DataTypes, Model} = require('sequelize');

const db = require('..');
// const walks = require('../routes/walks');
// const Dog = require('./Dog');
//--------------------------------------------------------------------------------------------------
//Define Model

const Walk = db.define('walks', {
  date: {
    type: Sequelize.DATE
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  payed_for: {
    type: Sequelize.BOOLEAN
  },
});
//-------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//Associations using basic associations

// Walk.belongsToMany(Dog, { through: 'walks_dogs', foreignKey: 'walk_id' });

//-------------------------------------------------------------------------------------------------
// Associations using asociate function

// Walk.associate = (models) => {

//   Walk.belongsToMany(models.Dog, {
//     through: 'walks_dogs',
//     foreignKey: 'walk_id',
//   });

  // Walk.belongsToMany(models.User, {
  //   through: 'users_walks',
  //   foreignKey: 'user_id',
  // });
// }

module.exports = Walk;