'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordAdmin = await bcrypt.hash("admin123", 10);
    const passwordClient = await bcrypt.hash("client123", 10);

    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'kelsgasparini@gmail.com',
          'danny@danny.com',
          'rupert@rupert.com'
        ]
      }
    });

    await queryInterface.bulkInsert('users', [
      {
        username: 'KelseyAdmin',
        email: 'kelsgasparini@gmail.com',
        password: passwordAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Danny',
        email: 'danny@danny.com',
        password: passwordClient,
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Rupert',
        email: 'rupert@rupert.com',
        password: passwordClient,
        role: 'client',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
