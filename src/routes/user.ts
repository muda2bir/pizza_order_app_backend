import { Router } from "express";
import passport from "passport";
import { v4 as uuid } from "uuid";
import { User } from "../sequelize/models/users";
import { hashPassword } from "../utils/hashing";
import isUserAuthenticated from "../middleware/user-auth";
export const router = Router();
import { Cart } from "../sequelize/models/cart";

// * Logging In the User /api/v1/users/login
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    return res.json({
      status: "ok",
      message: "Logged In Successfully!",
      user: req.user,
    });
  }
});

// * Registering In the User /api/v1/users/register
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password } = req.body; // destructuring the details from the the body;
    if (!full_name || !email || !password)
      return res.json({ status: "ok", message: "Incomplete Details!" });

    // * Check here if the user already exists;
    const theUser = await User.findOne({ where: { email: email } });
    if (theUser)
      return res.json({
        status: "error",
        message: "User Already exists with this email!",
      });

    let securePassword = hashPassword(password);
    if (!securePassword) {
      return res.json({
        status: "error",
        message: "Something went wrong!",
        error: "Hashing is not working!",
      });
    } // * Hashing the password before saving into the database;

    const user = await User.create({
      _id: uuid(),
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

router.get("/get_user", isUserAuthenticated, async (req, res) => {
  if (req.user) {
    return res.json({
      status: "ok",
      message: "User is logged in",
      user: req.user,
    });
  }
});
