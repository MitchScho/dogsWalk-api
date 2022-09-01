const Sequelize = require('sequelize');
const db = require('../db');
//--------------------------------------------------------------------------------------------------

//Define Model

const User = db.define('users', {
  name: {
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
//Associations

User.associate = (models) => {

};

module.exports = User;
