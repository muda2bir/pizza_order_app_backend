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
const cart_1 = require("../sequelize/models/cart");
const orders_1 = require("../sequelize/models/orders");
const user_auth_1 = __importDefault(require("../middleware/user-auth"));
exports.router = (0, express_1.Router)();
exports.router.post("/make_order", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.body;
        const allCarts = yield cart_1.Cart.findAll({
            where: { customer_id: customer_id },
        });
        if (allCarts.length < 1) {
            return res.json({
                status: "ok",
                message: "Cart is Empty!",
            });
        }
        for (let i = 0; i < allCarts.length; i++) {
            yield orders_1.Orders.create({
                order_id: (0, uuid_1.v4)(),
                pizza_name: allCarts[i].dataValues.pizza_name,
                customer_id: customer_id,
                ingredients: allCarts[i].dataValues.ingredients,
            });
        }
        const deletingCart = yield cart_1.Cart.destroy({
            where: { customer_id: customer_id },
        }); // * deleting the cart after user successfully places the order!
        return res.json({
            status: "ok",
            message: "Order Placed Successfully!",
        });
    }
    catch (err) {
        res.json({
            status: "error",
            message: "Something went wrong!",
        });
    }
}));
exports.router.get("/get_user_orders", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            const userOrders = yield orders_1.Orders.findAll({
                where: { customer_id: req.user._id },
            });
            return res.json({
                status: "ok",
                orders: userOrders,
                message: "Orders fetched successfully!",
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
exports.router.delete("/cancel_order", user_auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id } = req.body;
        const deletingOrder = yield orders_1.Orders.destroy({
            where: { order_id: order_id },
        });
        return res.json({
            status: "ok",
            message: "Order cancelled successfully!",
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
