const Sequelize = require('sequelize');
const db = require('..');

const Walk = db.define('walks', {
  date: {
    type: Sequelize.DATE
  },
  payed_for: {
    type: Sequelize.BOOLEAN
  },
})

Walk.associate = (models) => {

}

module.exports = Walk;
