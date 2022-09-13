const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('..');
// const Dog = require('./Dog');
//--------------------------------------------------------------------------------------------------
//Model defined

const WalkDog = db.define('walks_dogs', {
  walkId: {
    type: DataTypes.INTEGER,
  },
  dogId: {
    type: DataTypes.INTEGER,
  }

});

module.exports = WalkDog;
