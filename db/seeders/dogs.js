'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('dogs', [{
      name: 'Lexi',
      avatar: 'Lexi Avatar',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Roxy',
      avatar: 'Roxy Avatar',
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Eldon',
      avatar: 'Eldon Avatar',
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('dogs', null, {});

  }
};
