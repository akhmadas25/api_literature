"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("literaturs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      publication_date: {
        type: Sequelize.DATEONLY,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      ISBN: {
        type: Sequelize.INTEGER,
      },
      author: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      attach: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.DataTypes.ENUM(
          "verified",
          "cancel",
          "waiting for verified"
        ),
        defaultValue: "waiting for verified",
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("literaturs");
  },
};
