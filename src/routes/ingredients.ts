import { Router, Request, Response } from "express";
import { Ingredients } from "../sequelize/models/ingredients";
import isUserAuthenticated from "../middleware/user-auth";
export const router = Router();

router.get("/", isUserAuthenticated, async (req: Request, res: Response) => {
  try {
    const allIngredients = await Ingredients.findAll();
    if (req.user) {
      return res.json({
        status: "ok",
        message: "Ingredients fetched successfully",
        ingredients: allIngredients,
        user: req.user,
      });
    }
  } catch (err) {
    res.json({ status: "error", message: "Something went wrong!", error: err });
  }
});
