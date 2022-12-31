export default {
  dbHost: process.env.DB_SQL_HOST,
  dbUser: process.env.DB_SQL_USERNAME as string,
  dbPort: Number(process.env.DB_SQL_PORT),
  dbPassword: process.env.DB_SQL_PASSWORD as string,
  dbName: process.env.DB_SQL_DATABASENAME as string,
  dbDialect: process.env.NODE_ENV === 'test' ? 'postgres' : process.env.DB_SQL_DIALECT
};