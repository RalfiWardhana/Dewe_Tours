const {Sequelize} = require("sequelize");
const db = {};

const sequelize = new Sequelize('dewe_tours',{
    dialect : "mysql",
    username : "root",
    password : null,
    host : "localhost",
    pool : {
        max : 5,
        min : 0,
        acquire :30000,
        idle : 10000
    }
})

db.sequelize = sequelize;
module.exports = db;