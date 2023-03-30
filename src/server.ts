if (process.env.NODE_ENV !== "production") require("dotenv").config(); // * This is only going to import environment variables in the development
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
