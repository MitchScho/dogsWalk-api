const { DataTypes } = require('sequelize');
const User = require('./User');

const db = require('..');
// const Walk = require('./Walk');
//-----------------------------------------------------------------------------------

//------ Dog Model Defined -----------------------------------------------------------

const Dog = db.define('dogs', {
  name: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
});

//------------------------------------------------------------------------------------
//------ Associations ------------------------------------------------------------------------------
Dog.belongsTo(User);

module.exports = Dog;
