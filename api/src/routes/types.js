const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  var apiDiets = [
    "gluten free",
    "dairy free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "lacto ovo vegetarian",
    "ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
  ];
  try {
    apiDiets.forEach(async (diet) => {
      await Diet.findOrCreate({
        where: {
          name: diet,
        },
      });
    });
    const dbDiets = await Diet.findAll();
    res.status(200).send(dbDiets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
