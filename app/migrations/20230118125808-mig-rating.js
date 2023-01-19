"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("ratings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user: {
        type: Sequelize.UUID,
        refrences: {
          model: "users",
          key: "id",
        },
      },
      movie: {
        type: Sequelize.UUID,
        refrences: {
          model: "movies",
          key: "id",
        },
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdByUser: {
        type: Sequelize.UUID,
        refrences: {
          model: "users",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("ratings");
  },
};
