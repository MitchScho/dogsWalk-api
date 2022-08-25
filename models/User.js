const Sequelize = require('sequelize');
const db = require('../db');


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

User.associate = (models) => {

};

module.exports = User;
