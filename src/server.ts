import express from "express";
const app = express();
if (app.get("env") == "development") require("dotenv").config(); // * This is going to import environment variables
import passport from "passport";
import cors from "cors";
import { v4 as uuid } from "uuid";
import session from "express-session";
import "./strategies/local"; // * Local Authentication Strategy
const SequelizeStore = require("connect-session-sequelize")(session.Store);
import { sequelize } from "./sequelize";
import { db_connect } from "./utils/db_connect";
db_connect(); // Checking database connection.
sequelize.sync({ alter: true }).catch((err) => console.error(err)); // * Syncing all the tables with the database;
// routes of the application
import { router as userRoutes } from "./routes/user";
import { router as ingredientsRouter } from "./routes/ingredients";
import { router as cartRouter } from "./routes/cart";
import { router as orderRouter } from "./routes/order";

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // TODO: Update the CORS_ORIGIN after the project deploys successfully!

const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 1000 * 60 * 60 * 24 * 7,
});
app.use(express.json({ limit: "50mb" })); // * This is a middleware that will parse the json coming before sending the response
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    genid: function () {
      return uuid();
    },
    name: "sid",
    secret: process.env.SESSION_SECRET_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
); // * This is the session middleware

sessionStore.sync(); // Syncing with the database table

// * Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Index page!" });
});

app.use("/api/v1/users", userRoutes); // user route
app.use("/api/v1/ingredients", ingredientsRouter); // ingredients route
app.use("/api/v1/cart", cartRouter); // cart route
app.use("/api/v1/order", orderRouter); // order route

const PORT = process.env.PORT || 5174;
app.listen(PORT);
