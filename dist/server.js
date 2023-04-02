"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production")
    require("dotenv").config(); // * This is only going to import environment variables in the development
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const express_session_1 = __importDefault(require("express-session"));
require("./strategies/local"); // * Local Authentication Strategy
const SequelizeStore = require("connect-session-sequelize")(express_session_1.default.Store);
const app = (0, express_1.default)();
const db_connect_1 = require("./utils/db_connect");
(0, db_connect_1.db_connect)(); // Checking database connection.
const sequelize_1 = require("./sequelize");
sequelize_1.sequelize.sync({ alter: true }).catch((err) => console.error(err)); // * Syncing all the tables with the database;
// routes of the application
const user_1 = require("./routes/user");
if (process.env.NODE_ENV === "production")
    app.set("trust proxy", 1);
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
})); // TODO: Update the CORS_ORIGIN after the project deploys successfully!
const sessionStore = new SequelizeStore({
    db: sequelize_1.sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 1000 * 60 * 60 * 24 * 7,
});
app.use(express_1.default.json({ limit: "50mb" })); // * This is a middleware that will parse the json coming before sending the response
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, express_session_1.default)({
    genid: function () {
        return (0, uuid_1.v4)();
    },
    name: "sid",
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    proxy: true,
    cookie: {
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
})); // * This is the session middleware
sessionStore.sync(); // Syncing with the database table
// * Passport Initialization
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", (req, res) => {
    res.json({ message: "Index page!" });
});
app.use("/api/v1/users", user_1.router); // user route
const PORT = process.env.PORT || 5174;
app.listen(PORT);
