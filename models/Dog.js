const Sequelize = require('sequelize');
const db = require('../db');


const Dog = db.define('dogs', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
})

// Dog.associate = (models) => {
//   Dog.belongsToMany(models.Walk, {
//     through: 'walks_dogs',
//     foreignKey: 'walk_id',
//   });
//   Dog.belongsTo(models.User, {
//     foreignKey: 'owner_id'
//   })
// };

module.exports = Dog;
