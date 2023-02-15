'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      username: 'Mitchell',
      email: 'mitchell@mitchell.com',
      password: "1234",
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      username: 'Neighbour',
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
