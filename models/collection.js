"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      collection.belongsTo(models.literatur, {
        as: "literatur",
        foreignKey: {
          name: "literaturId",
        },
      });
      collection.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  collection.init(
    {
      userId: DataTypes.INTEGER,
      literaturId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collection",
    }
  );
  return collection;
};
