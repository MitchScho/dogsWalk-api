const Sequelize = require('sequelize');

const db = require('..');
// const Walk = require('./Walk');

//---------------------------------------------------------------------------
//Define Model

const Dog = db.define('dogs', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
});

//------------------------------------------------------------------------------
// Basic association syntax
// Dog.belongsToMany(Walk, { through: 'walks_dogs', foreignKey: 'dog_id' });

//-----------------------------------------------------------------------------------

//Association function syntax

// Dog.associate = (models) => {
//   Dog.belongsToMany(models.Walk, {
//     through: 'walks_dogs',
//     foreignKey: 'dog_id',
//   });
  // Dog.belongsTo(models.User, {
  //   foreignKey: 'owner_id'
  // })
// };

module.exports = Dog;
