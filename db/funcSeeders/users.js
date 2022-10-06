'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      name: 'Mitchell',
      email: 'mitchell@mitchell.com',
      password: "1234",
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      name: 'Neighbour',
      email: 'neighbour@neighbour.com',
      password: "1234",
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
