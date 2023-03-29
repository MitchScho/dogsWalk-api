const {Sequelize} = require('sequelize');
const db = require('..');
const Dog = require('./Dog');
//--------------------------------------------------------------------------------------------------

//------ User Model Defined ------------------------------------------------------------------------

const User = db.define('users', {
  username: {
    type: Sequelize.STRING,


  },
  email: {
    type: Sequelize.STRING,

  },
  password: {
    type: Sequelize.STRING,

  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "client",
  },
})

//------------------------------------------------------------------------------------------------------

//------ Associations ------------------------------------------------------------------------------
// User.hasMany(Dog);


module.exports = User;
