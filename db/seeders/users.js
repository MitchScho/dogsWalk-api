'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      username: 'KelseyAdmin',
      email: 'kelsgasparini@gmail.com',
      password: "$2a$10$iCNKeOFkVc6qUufclxGXZuiY5vYDpLMV5WeXYsBlmAzeEI1He1i6q",
      role: "admin",
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
