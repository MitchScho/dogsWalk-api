const {
  DataTypes
} = require('sequelize');
const db = require('..');

//--------------------------------------------------------------------------------------------------
//------ WalkRequestDog Model Defined ----------------------------------------------------------------------------

const WalkRequestDog = db.define('walks_requests_dogs', {
  walkRequestId: {
    type: DataTypes.INTEGER,
  },
  dogId: {
    type: DataTypes.INTEGER,
  }

});
//---------------------------------------------------------------------------------------------------

module.exports = WalkRequestDog;
