import { DataTypes } from "sequelize";
import { sequelize } from "../index";

export const Cart = sequelize.define(
  "cart",
  {
    cart_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    pizza_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "_id",
      },
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
