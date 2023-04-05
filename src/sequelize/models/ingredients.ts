import { DataTypes } from "sequelize";
import { sequelize } from "../index";

export const Ingredients = sequelize.define(
  "ingredients",
  {
    _id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Ingredients are pre added in the database
