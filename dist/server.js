"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production")
    require("dotenv").config(); // * This is only going to import environment variables in the development
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});
