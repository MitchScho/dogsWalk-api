'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('walks', [{
      userId: 1,
      payed_for: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 2,
      payed_for: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 1,
      payed_for: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('walks', null, {});

  }
};
