const { DataTypes } = require('sequelize');
const User = require('./User');

const db = require('..');
// const Walk = require('./Walk');
//-----------------------------------------------------------------------------------

//------ Dog Model Defined -----------------------------------------------------------

const Dog = db.define('dogs', {
  userId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
});

//------------------------------------------------------------------------------------
//------ Associations ------------------------------------------------------------------------------
Dog.belongsTo(User, {foreignKey: 'userId'});

module.exports = Dog;
