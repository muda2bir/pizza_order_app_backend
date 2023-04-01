"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production")
    require("dotenv").config(); // * This is only going to import environment variables in the development
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_connect_1 = require("./utils/db_connect");
(0, db_connect_1.db_connect)(); // Checking database connection.
// routes of the application
const user_1 = require("./routes/user");
app.use(express_1.default.json()); // middleware that will help parse the json
app.get("/", (req, res) => {
    res.json({ message: "Index page!" });
});
app.use("/users", user_1.router); // user route
const PORT = process.env.PORT || 5174;
app.listen(PORT);
