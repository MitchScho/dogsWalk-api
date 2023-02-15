const Sequelize = require('sequelize');
const db = require('..');
//--------------------------------------------------------------------------------------------------

//------ User Model Defined ------------------------------------------------------------------------

const User = db.define('users', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
})

//------------------------------------------------------------------------------------------------------


module.exports = User;
