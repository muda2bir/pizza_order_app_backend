import { Router, Request, Response } from "express";
import { Ingredients } from "../sequelize/models/ingredients";
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allIngredients = await Ingredients.findAll();
    res.json({
      status: "ok",
      message: "Ingredients fetched successfully",
      ingredients: allIngredients,
    });
  } catch (err) {
    res.json({ status: "error", message: "Something went wrong!", error: err });
  }
});
