const dbConfig = require("./config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  post: process.env.DB_PORT,
  dialect: 'postgres',
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;