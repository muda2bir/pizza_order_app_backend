if (process.env.NODE_ENV !== "production") require("dotenv").config(); // * This is only going to import environment variables in the development
import express from "express";
const app = express();
import { db_connect } from "./utils/db_connect";
db_connect(); // Checking database connection.
// routes of the application
import { router as userRoutes } from "./routes/user";

app.use(express.json()); // middleware that will help parse the json

app.get("/", (req, res) => {
  res.json({ message: "Index page!" });
});

app.use("/users", userRoutes); // user route

const PORT = process.env.PORT || 5174;
app.listen(PORT);
