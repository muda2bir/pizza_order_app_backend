import { Sequelize } from "sequelize";

const DATABASE_NAME = process.env.DATABASE_NAME as string;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

export const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
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
  }
);
