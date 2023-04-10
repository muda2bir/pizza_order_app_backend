import { Sequelize } from "sequelize";

const DB_URI = process.env.DATABASE_URL as string;

export const sequelize = new Sequelize(DB_URI, {
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
