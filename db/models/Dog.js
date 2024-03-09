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
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: 'https://firebasestorage.googleapis.com/v0/b/walkdogs-5bd5e.appspot.com/o/dog.thumbnail.png?alt=media&token=5365f699-4ea4-4617-aacd-53c8b84e473e'
  },
});

//------------------------------------------------------------------------------------
//--- Associations ---
Dog.belongsTo(User, {foreignKey: 'userId'});

module.exports = Dog;
