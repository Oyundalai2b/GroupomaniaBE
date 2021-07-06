const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DB,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5, //maximum number of connection in pool
    min: 0, //minimum number of connection in pool
    acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, //maximum time, in milliseconds, that a connection can be idle before being released
  },
  dialectOptions: {
    options: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+11:00",
  },
};
