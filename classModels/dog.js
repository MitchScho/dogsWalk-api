'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //---------------------------------------------------------------------
      // Dog.belongsToMany(models.Walk, {
      //   through: 'walks_dogs',
      //   foreignKey: 'dog_id',
      // });
      // Dog.belongsTo(models.User, {
      //   foreignKey: 'owner_id'
      // })
      //-----------------------------------------------------------------------
    }
  }
  Dog.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};
