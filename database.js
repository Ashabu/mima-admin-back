const  Sequelize  = require('sequelize');

module.exports = new Sequelize('MimaAdmin', 'api', 'traki123', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: { instanceName: "SQLEXPRESS" }
  }
});