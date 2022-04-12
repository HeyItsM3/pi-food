const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();

router.get("/", async (res, next) => {
  const dietList = [
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
    dietList.forEach((elem) => {
      Diet.findOrCreate({
        where: { name: elem },
      });
    });

    const allTypes = await Diet.findAll();
    res.send(allTypes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
