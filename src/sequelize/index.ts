import { Sequelize } from "sequelize";

const username = process.env.DATABASE_USERNAME as string;
const password = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME as string;

export const sequelize = new Sequelize(dbName, username, password, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
});
