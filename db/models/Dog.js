const Sequelize = require('sequelize');
const User = require('./User');

const db = require('..');
// const Walk = require('./Walk');
//-----------------------------------------------------------------------------------

//------ Dog Model Defined -----------------------------------------------------------

const Dog = db.define('dogs', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
});

//------------------------------------------------------------------------------------
//------ Associations ------------------------------------------------------------------------------
Dog.belongsTo(User);

module.exports = Dog;
