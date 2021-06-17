import * as dotenv from "dotenv";
const Sequelize = require("sequelize"); 
dotenv.config();

const DATABASE_NAME = process.env.DB_NAME!;
const DATABASE_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASS!;
 
module.exports = new Sequelize(DATABASE_NAME,DATABASE_USER,DB_PASSWORD, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})
 

