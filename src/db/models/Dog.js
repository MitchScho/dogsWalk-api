const Sequelize = require('sequelize');
const db = require('..');


const Dog = db.define('dogs', {
  name: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
})

Dog.associate = (models) => {

}

module.exports = Dog;
