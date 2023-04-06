"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredients = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
exports.Ingredients = index_1.sequelize.define("ingredients", {
    _id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: false,
});
// Ingredients are pre added in the database
