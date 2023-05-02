import { DataTypes } from "sequelize";
import { sequelize } from "../index";

export const User = sequelize.define(
  "users",
  {
    _id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
