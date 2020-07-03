const Sequilize = require('sequelize');
const db = {}
const sequelize = new Sequilize("db_jamaah", "root","",{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize
db.Sequilize = Sequilize

module.exports = db;