const { Sequelize } = require('sequelize');
const db = require('..');
const Dog = require('./Dog');
const User = require('./User');
const WalkDog = require('./WalkDog');
//--------------------------------------------------------------------------------------------------
//------ Walk Model Defined ------------------------------------------------------------------------------

const Walk = db.define('walks', {
  date: {
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.INTEGER
  },
  payedFor: {
    type: Sequelize.BOOLEAN
  },
  isAccepted: {
    type: Sequelize.BOOLEAN
  },
});
//-------------------------------------------------------------------------------------------------

//------ Associations ------------------------------------------------------------------------------
Walk.belongsTo(User);
Walk.belongsToMany(Dog, { through: WalkDog });

//-------------------------------------------------------------------------------------------------


module.exports = Walk;
