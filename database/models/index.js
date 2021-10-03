const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('./../config/config');
// let sequelize;
const basename = path.basename(__filename);
const db = {};


let sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        options: { instanceName: dbConfig.instanceName }
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    define: {
        freezeTableName: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // If don't want createdAt
        createdAt: false,
        // If don't want updatedAt
        updatedAt: false,
    }
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        //let model = sequelize['import'](path.join(__dirname, file));
        let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        if (dbConfig.schema && dbConfig.schema.length > 0) {
            model = model.schema(dbConfig.schema);
        }
        db[model.name] = model;
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;