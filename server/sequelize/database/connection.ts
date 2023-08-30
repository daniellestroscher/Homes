// const dotenv = require("dotenv");
// dotenv.config();

// import * as pg from "pg";
// // import { Sequelize, Dialect } from "sequelize";

// const dbName = process.env.DB_SQL_DATABASENAME as string;
// const dbUser = process.env.DB_SQL_USERNAME as string;
// const dbPassword = process.env.DB_SQL_PASSWORD as string;
// const dbHost = process.env.DB_SQL_HOST as string;
// const dbPort = process.env.DB_SQL_PORT as string;
// const dbDialect = process.env.DB_SQL_DIALECT as string;

// // export const sequelize = new Sequelize(
// //   `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
// // );

// export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   port: Number(dbPort),
//   dialect: 'postgres',
//   dialectModule: pg,
//   // logging: false,
//   // pool: {
//   //   max: 5,
//   //   min: 0,
//   //   acquire: 30000,
//   //   idle: 10000,
//   // },
// });

// // Example function to test the connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log(
//       "Connection to the database has been established successfully."
//     );
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// testConnection();
