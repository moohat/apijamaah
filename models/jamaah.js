const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'tb_jamaah',
    {
        idjamaah:{
            type : Sequelize.STRING(15),
            primaryKey: true,
        },
        namajamaah:{
            type : Sequelize.STRING(50),
        },
        gender:{
            type: Sequelize.ENUM('L', 'P')
        },
        telpjamaah:{
            type: Sequelize.STRING(15)
        }

    },
    {
        timestamps: false,
        freezeTableName: true
    },
)