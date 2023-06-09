import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL as string;
const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME as string;

export const sequelize = new Sequelize(DATABASE_URL, {
  host: DATABASE_HOSTNAME,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  port: 5432,
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
  },
  logging: false,
});
