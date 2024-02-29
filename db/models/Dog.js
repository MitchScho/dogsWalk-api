const { DataTypes } = require('sequelize');
const User = require('./User');
const db = require('..');
//-----------------------------------------------------------------------------------

//--- Dog Model Defined ---

const Dog = db.define('dogs', {
  userId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
});

//------------------------------------------------------------------------------------
//--- Associations ---
Dog.belongsTo(User, {foreignKey: 'userId'});

module.exports = Dog;
