"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class literatur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      literatur.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      literatur.hasMany(models.collection, {
        as: "literatur",
        foreignKey: {
          name: "literaturId",
        },
      });
    }
  }
  literatur.init(
    {
      title: DataTypes.STRING,
      publication_date: DataTypes.DATEONLY,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.INTEGER,
      author: DataTypes.STRING,
      attach: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("verified", "cancel", "waiting for verivied"),
        defaultValue: "waiting for verified",
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "literatur",
    }
  );
  return literatur;
};
