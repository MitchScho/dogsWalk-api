'use strict';

module.exports = {



  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('dogs', [{
      name: 'Lexi',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Rover',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Snoop',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Filbert',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Roxy',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Eldon',
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('dogs', null, {});

  }
};
