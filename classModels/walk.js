'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Walk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //------------------------------------------------------------------------
      // Walk.belongsToMany(models.Dog, {
      //   through: 'walks_dogs',
      //   foreignKey: 'walk_id',
      // });

      // Walk.belongsToMany(models.User, {
      //   through: 'users_walks',
      //   foreignKey: 'user_id',
      // });
      //-------------------------------------------------------------------------
    }
  }
  Walk.init({
    date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    payed_for: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Walk',
  });
  return Walk;
};
