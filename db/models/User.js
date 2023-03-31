const { DataTypes } = require('sequelize');
const db = require('..');
const Dog = require('./Dog');
//--------------------------------------------------------------------------------------------------

//------ User Model Defined ------------------------------------------------------------------------

const User = db.define('users', {
  username: {
    type: DataTypes.STRING,

  },
  email: {
    type: DataTypes.STRING,

  },
  password: {
    type: DataTypes.STRING,

  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "client",
  },
})

//------------------------------------------------------------------------------------------------------

//------ Associations ------------------------------------------------------------------------------
// User.hasMany(Dog);


module.exports = User;
