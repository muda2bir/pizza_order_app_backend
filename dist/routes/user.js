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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const uuid_1 = require("uuid");
const users_1 = require("../sequelize/models/users");
const hashing_1 = require("../utils/hashing");
const user_auth_1 = __importDefault(require("../middleware/user-auth"));
exports.router = (0, express_1.Router)();
// * Logging In the User /api/v1/users/login
exports.router.post("/login", passport_1.default.authenticate("local"), (req, res) => {
    if (req.user) {
        return res.json({
            status: "ok",
            message: "Logged In Successfully!",
            user: req.user,
        });
    }
});
// * Registering In the User /api/v1/users/register
exports.router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { full_name, email, password } = req.body; // destructuring the details from the the body;
        if (!full_name || !email || !password)
            return res.json({ status: "ok", message: "Incomplete Details!" });
        // * Check here if the user already exists;
        const theUser = yield users_1.User.findOne({ where: { email: email } });
        if (theUser)
            return res.json({
                status: "error",
                message: "User Already exists with this email!",
            });
        let securePassword = (0, hashing_1.hashPassword)(password);
        if (!securePassword) {
            return res.json({
                status: "error",
                message: "Something went wrong!",
                error: "Hashing is not working!",
            });
        } // * Hashing the password before saving into the database;
        const user = yield users_1.User.create({
            _id: (0, uuid_1.v4)(),
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
exports.router.get("/get_user", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        return res.json({
            status: "ok",
            message: "User is logged in",
            user: req.user,
        });
    }
}));
exports.router.post("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.json({
                status: "error",
                message: "Something went wrong!",
                error: err,
            });
        }
        return res.json({
            status: "ok",
            message: "User Successfully Logged Out!",
        });
    });
});
