import { Router } from "express";
import { User } from "../sequelize/models/users";
import { hashPassword } from "../utils/hashing";
export const router = Router();

User.sync({ alter: true }).catch((error) => console.error(error)); // * Syncing the user table

router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body; // destructuring the details from the the body;
    if (!full_name || !email || !password)
      return res.json({ status: "ok", message: "Incomplete Details!" });

    // ! Check here if the user already exists;

    let securePassword = hashPassword(password);
    if (!securePassword) {
      return res.json({
        status: "error",
        message: "Something went wrong!",
        error: "Hashing is not working!",
      });
    }

    const user = await User.create({
      full_name,
      email,
      password: securePassword,
    }); // creating the user and saving into the database;

    return res.json({
      status: "ok",
      message: "User Registered Successfully!",
      userId: user.toJSON()._id,
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Something went wrong!",
      error: error,
    });
  }
});
