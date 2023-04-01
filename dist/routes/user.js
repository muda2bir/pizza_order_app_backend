"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_1 = require("../sequelize/models/users");
const hashing_1 = require("../utils/hashing");
exports.router = (0, express_1.Router)();
users_1.User.sync({ alter: true }).catch((error) => console.error(error)); // * Syncing the user table
exports.router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { full_name, email, password } = req.body; // destructuring the details from the the body;
        if (!full_name || !email || !password)
            return res.json({ status: "ok", message: "Incomplete Details!" });
        // ! Check here if the user already exists;
        let securePassword = (0, hashing_1.hashPassword)(password);
        if (!securePassword) {
            return res.json({
                status: "error",
                message: "Something went wrong!",
                error: "Hashing is not working!",
            });
        }
        const user = yield users_1.User.create({
            full_name,
            email,
            password: securePassword,
        }); // creating the user and saving into the database;
        return res.json({
            status: "ok",
            message: "User Registered Successfully!",
            userId: user.toJSON()._id,
        });
    }
    catch (error) {
        return res.json({
            status: "error",
            message: "Something went wrong!",
            error: error,
        });
    }
}));
