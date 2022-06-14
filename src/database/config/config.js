require('dotenv').config();
/* los process.env.DB_ los leo desde la variable de entorno .env */
module.exports = {
  development: {
    username:  process.env.DB_USERNAME,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}