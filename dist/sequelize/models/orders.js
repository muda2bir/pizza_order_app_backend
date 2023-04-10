"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
exports.Orders = index_1.sequelize.define("orders", {
    order_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    pizza_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    customer_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: "users",
            key: "_id",
        },
    },
    ingredients: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    total_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    createdAt: "orderedAt",
});
