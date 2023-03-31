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
      username: 'Danny',
      email: 'danny@danny.com',
      password: "$2a$10$wy/.Ou5x36dVkVceA7A5A.LCosxMENOHS0yap3UOrRAJiAFNYCB3e",
      role: "client",
      createdAt: new Date(),
      updatedAt: new Date(),

    },
    {
      username: 'Rupert',
      email: 'rupert@rupert.com',
      password: "$2a$10$wy/.Ou5x36dVkVceA7A5A.LCosxMENOHS0yap3UOrRAJiAFNYCB3e",
      role: "client",
      createdAt: new Date(),
      updatedAt: new Date(),

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
