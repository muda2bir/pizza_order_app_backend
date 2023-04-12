"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.sequelize = new sequelize_1.Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
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
