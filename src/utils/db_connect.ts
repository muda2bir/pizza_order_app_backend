import { sequelize } from "../sequelize/index";

export async function db_connect() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error(error);
  }
}
