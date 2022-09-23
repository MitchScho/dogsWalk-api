const { Sequelize, DataTypes } = require('sequelize');
const db = require('..');

//--------------------------------------------------------------------------------------------------
//Model defined

const WalkDog = db.define('walks_dogs', {
  walkId: {
    type: DataTypes.INTEGER,
  },
  dogId: {
    type: DataTypes.INTEGER,
  }

});
//---------------------------------------------------------------------------------------------------

module.exports = WalkDog;
