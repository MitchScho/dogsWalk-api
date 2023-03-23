const {DataTypes} = require('sequelize');
const db = require('..');
const User = require('./User');
const Dog = require('./Dog');
const WalkRequestDog = require('./WalkRequestDog');
//--------------------------------------------------------------------------------------------------
//------ WalkDog Model Defined ----------------------------------------------------------------------------

const WalkRequest = db.define('walk_request', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  payedFor: {
    type: DataTypes.BOOLEAN
  },
  isAccepted: {
    type: DataTypes.BOOLEAN
  },

});
//---------------------------------------------------------------------------------------------------
WalkRequest.belongsTo(User);
WalkRequest.belongsToMany(Dog, {
  through: WalkRequestDog
});


module.exports = WalkRequest;
