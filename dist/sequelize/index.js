"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;
exports.sequelize = new sequelize_1.Sequelize(dbName, username, password, {
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
