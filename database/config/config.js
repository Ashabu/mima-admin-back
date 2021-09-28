const dbConfig = {
    DB: 'MimaAdmin',
    USERNAME: 'api',
    PASSWORD: 'traki123',
    HOST: 'localhost',
    dialect: 'mssql',
    instanceName: "SQLEXPRESS",
    schema: 'dbo',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
}

module.exports = dbConfig;