const Sequelize = require('sequelize');
const db = require('../db');

const Walk = db.define('walk', {
  date: {
    type: Sequelize.DATE
  },
  payed_for: {
    type: Sequelize.BOOLEAN
  },
})

module.exports = Walk;
