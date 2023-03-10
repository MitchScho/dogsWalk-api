const { DataTypes } = require('sequelize');
const db = require('..');
const Dog = require('./Dog');
const User = require('./User');
const WalkDog = require('./WalkDog');
//--------------------------------------------------------------------------------------------------
//------ Walk Model Defined ------------------------------------------------------------------------------

const Walk = db.define('walks', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  userId: {
    type: DataTypes.INTEGER
  },
  payedFor: {
    type: DataTypes.BOOLEAN
  },
  isAccepted: {
    type: DataTypes.BOOLEAN
  },
});
//-------------------------------------------------------------------------------------------------

//------ Associations ------------------------------------------------------------------------------
Walk.belongsTo(User);
Walk.belongsToMany(Dog, { through: WalkDog });

//-------------------------------------------------------------------------------------------------


module.exports = Walk;
