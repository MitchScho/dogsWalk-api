const { DataTypes } = require('sequelize');
const db = require('..');
//--------------------------------------------------------------------------------------------------

//--- User Model Defined ---

const User = db.define('users', {
  username: {
    type: DataTypes.STRING,

  },
  email: {
    type: DataTypes.STRING,

  },
  password: {
    type: DataTypes.STRING,

  },
  role: {
    type: DataTypes.ENUM("admin", "client"),
    allowNull: false,
    defaultValue: "client"
  },
})

//------------------------------------------------------------------------------------------------------

//--- Associations ----
// Note: User.hasMany(Dog) relationship is established via Dog.belongsTo(User) in Dog.js
// Sequelize should handle the inverse relationship automatically
// If explicit hasMany is needed, it can be defined in a separate associations file


module.exports = User;
