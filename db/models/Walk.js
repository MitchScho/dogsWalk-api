'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Walk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Walk.belongsTo(User);
      Walk.belongsToMany(Dog, { through: WalkDog });
    }
  }
  Walk.init({
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    payedFor: DataTypes.BOOLEAN,
    isAccepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Walk',
  });
  return Walk;
};
