import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL as string;
const DATABASE_HOSTNAME = process.env.DATABASE_HOSTNAME as string;

export const sequelize = new Sequelize(DATABASE_URL, {
  host: DATABASE_HOSTNAME,
  dialect: "postgres",
});
