const Sequelize = require('sequelize');


const Dog = db.define('dog', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
})

module.exports = Dog;
