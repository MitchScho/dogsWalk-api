const Sequelize = require('sequelize');

const db = require('..');
const Walk = require('./Walk');
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


module.exports = Dog;
