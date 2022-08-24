const Sequelize = require('sequelize');
const db = require('../db');


const Dog = db.define('dog', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
})

module.exports = Dog;
