import { Router } from "express";
import { v4 as uuid } from "uuid";
import isUserAuthenticated from "../middleware/user-auth";
import { Cart } from "../sequelize/models/cart";
export const router = Router();

router.get("/get_user_cart", isUserAuthenticated, async (req, res) => {
  if (req.user) {
    try {
      const userCart = await Cart.findAll({
        where: { customer_id: req.user._id },
      });
      return res.json({
        status: "ok",
        cart: userCart,
        message: "Cart fetched successfully!",
      });
    } catch (err) {
      return res.json({
        status: "error",
        message: "Something went wrong!",
        error: err,
      });
    }
  }
});

// Pushing an item into the cart
router.post("/push_to_cart", isUserAuthenticated, async (req, res) => {
  try {
    const { pizza_name, customer_id, ingredients } = req.body;
    if (!pizza_name || !customer_id || !ingredients) {
      return res.json({
        status: "error",
        message: "Please send all the details!",
      });
    }

    const newCartItem = await Cart.create({
      cart_id: uuid(),
      pizza_name: pizza_name,
      customer_id: customer_id,
      ingredients: ingredients,
    });

    return res.json({
      status: "ok",
      message: "Item added in the cart successfully!",
      cart_id: newCartItem.toJSON()._id,
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Something went wrong!",
      error: err,
    });
  }
});
