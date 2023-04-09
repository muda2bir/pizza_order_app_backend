import { Request, Response, Router } from "express";
import { Ingredients } from "../sequelize/models/ingredients";
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allIngredients = await Ingredients.findAll();
    if (req.user) {
      return res.json({
        status: "ok",
        message: "Ingredients fetched successfully",
        ingredients: allIngredients,
        user: req.user,
      });
    } else {
      return res.json({
        status: "error",
        message: "User not logged in",
        ingredients: allIngredients,
      });
    }
  } catch (err) {
    res.json({ status: "error", message: "Something went wrong!", error: err });
  }
});
