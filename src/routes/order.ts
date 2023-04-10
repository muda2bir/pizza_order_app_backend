import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Cart } from "../sequelize/models/cart";
import { Orders } from "../sequelize/models/orders";
import isUserAuthenticated from "../middleware/user-auth";
export const router = Router();

router.post("/make_order", isUserAuthenticated, async (req, res) => {
  try {
    const { customer_id } = req.body;
    const allCarts = await Cart.findAll({
      where: { customer_id: customer_id },
    });

    if (allCarts.length < 1) {
      return res.json({
        status: "ok",
        message: "Cart is Empty!",
      });
    }

    for (let i = 0; i < allCarts.length; i++) {
      await Orders.create({
        order_id: uuid(),
        pizza_name: allCarts[i].dataValues.pizza_name,
        customer_id: customer_id,
        ingredients: allCarts[i].dataValues.ingredients,
        total_price: allCarts[i].dataValues.total_price,
      });
    }

    const deletingCart = await Cart.destroy({
      where: { customer_id: customer_id },
    }); // * deleting the cart after user successfully places the order!

    return res.json({
      status: "ok",
      message: "Order Placed Successfully!",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Something went wrong!",
    });
  }
});

router.get("/get_user_orders", isUserAuthenticated, async (req, res) => {
  if (req.user) {
    try {
      const userOrders = await Orders.findAll({
        where: { customer_id: req.user._id },
      });

      return res.json({
        status: "ok",
        orders: userOrders,
        message: "Orders fetched successfully!",
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

router.delete("/cancel_order", isUserAuthenticated, async (req, res) => {
  try {
    const { order_id } = req.body;
    const deletingOrder = await Orders.destroy({
      where: { order_id: order_id },
    });
    return res.json({
      status: "ok",
      message: "Order cancelled successfully!",
    });
  } catch (err) {
    return res.json({
      status: "error",
      message: "Something went wrong!",
      error: err,
    });
  }
});
