const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('..');
// const Dog = require('./Dog');
//--------------------------------------------------------------------------------------------------
//Model defined

const WalkDog = db.define('walks_dogs', {
  walk_id: {
    type: DataTypes.INTEGER,
  },
  dog_id: {
    type: DataTypes.INTEGER,
  }

});

module.exports = WalkDog;
