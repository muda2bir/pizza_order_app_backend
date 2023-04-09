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
const uuid_1 = require("uuid");
const user_auth_1 = __importDefault(require("../middleware/user-auth"));
const cart_1 = require("../sequelize/models/cart");
exports.router = (0, express_1.Router)();
exports.router.get("/get_user_cart", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            const userCart = yield cart_1.Cart.findAll({
                where: { customer_id: req.user._id },
            });
            return res.json({
                status: "ok",
                cart: userCart,
                message: "Cart fetched successfully!",
            });
        }
        catch (err) {
            return res.json({
                status: "error",
                message: "Something went wrong!",
                error: err,
            });
        }
    }
}));
// Pushing an item into the cart
exports.router.post("/push_to_cart", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pizza_name, customer_id, ingredients } = req.body;
        if (!pizza_name || !customer_id || !ingredients) {
            return res.json({
                status: "error",
                message: "Please send all the details!",
            });
        }
        const newCartItem = yield cart_1.Cart.create({
            cart_id: (0, uuid_1.v4)(),
            pizza_name: pizza_name,
            customer_id: customer_id,
            ingredients: ingredients,
        });
        return res.json({
            status: "ok",
            message: "Item added in the cart successfully!",
            cart_id: newCartItem.toJSON()._id,
        });
    }
    catch (err) {
        return res.json({
            status: "error",
            message: "Something went wrong!",
            error: err,
        });
    }
}));
