import { Sequelize, Dialect, DataTypes } from 'sequelize';
// import fs from 'fs'
// import path from 'path'
import env from '../utils/env';

export const sequelize = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
  host: env.dbHost,
  dialect: env.dbDialect as Dialect,
  port: env.dbPort,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// const db = {} as any;
// const files = fs.readdirSync(__dirname);

// for (const file of files) {
//   if (file !== 'index.js') {
//     const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   }
// }

// for (const model in db) {
//   if(db[model].associate) db[model].associate(db);
// }

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

