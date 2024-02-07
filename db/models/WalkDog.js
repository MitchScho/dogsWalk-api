const { DataTypes } = require('sequelize');
const db = require('..');

//--------------------------------------------------------------------------------------------------
//--- WalkDog Model Defined ---

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
