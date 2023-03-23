'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('walks', [{

      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('walks', null, {});

  }
};
