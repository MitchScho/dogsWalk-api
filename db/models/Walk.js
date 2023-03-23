const { DataTypes } = require('sequelize');
const db = require('..');
const Dog = require('./Dog');

const WalkDog = require('./WalkDog');
//--------------------------------------------------------------------------------------------------
//------ Walk Model Defined ------------------------------------------------------------------------------

const Walk = db.define('walks', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
});
//-------------------------------------------------------------------------------------------------

//------ Associations ------------------------------------------------------------------------------
// Walk.belongsTo(User);
Walk.belongsToMany(Dog, { through: WalkDog });

//-------------------------------------------------------------------------------------------------


module.exports = Walk;
