'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('walks', [{
      userId: 1,
      payedFor: false,
      isAccepted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 2,
      payedFor: false,
      isAccepted: false,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 1,
      payedFor: false,
      isAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      userId: 2,
      payedFor: true,
      isAccepted: true,
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('walks', null, {});

  }
};
