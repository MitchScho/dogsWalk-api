const { Sequelize } = require('sequelize');
//------ Database Connection Configuration With Sequelize ----------------------------------------------------
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',

});


module.exports = db;
