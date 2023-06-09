import { sequelize } from "../sequelize";

export async function db_connect() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.log("Unable to connect to the Database: ", error);
  }
}
