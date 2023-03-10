const {Sequelize} = require('sequelize');
const db = require('..');
//--------------------------------------------------------------------------------------------------

//------ User Model Defined ------------------------------------------------------------------------

const User = db.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "client",
  },
})

//------------------------------------------------------------------------------------------------------


module.exports = User;
