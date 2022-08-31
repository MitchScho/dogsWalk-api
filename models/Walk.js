const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../db');

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
})

Walk.associate = (models) => {

  Walk.belongsToMany(models.Dog, {
    through: 'walks_dogs',
    foreignKey: 'walk_id',
  });

  // Walk.belongsToMany(models.User, {
  //   through: 'users_walks',
  //   foreignKey: 'user_id',
  // });
}

module.exports = Walk;
