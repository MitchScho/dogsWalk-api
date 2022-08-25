const Sequelize = require('sequelize');
const db = require('..');


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

module.exports = Dog;
