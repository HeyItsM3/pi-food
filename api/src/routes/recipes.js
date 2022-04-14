const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const getAllRecipes = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const allRecipes = await getAllRecipes();
    if (!name) {
      res.send(allRecipes);
    } else {
      let recipe = allRecipes.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length > 0
        ? res.send(recipe)
        : res.status(404).send("No se ha encontrado la receta");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipes = await getAllRecipes();
    if (id) {
      let recipeId = recipes.filter((e) => e.id === Number(id));
      recipeId.length > 0
        ? res.send(recipeId)
        : res.status(404).send("No se ha encontrado la receta por id");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  let { name, image, summary, rating, health, instructions, diets, createdDB } =
    req.body;
  try {
    let recipeC = await Recipe.create({
      name,
      image,
      summary,
      rating,
      health,
      instructions,
      createdDB,
    });

    if (name && summary) {
      const findDiet = await Diet.findAll({ where: { name: diets } });
      recipeC.addDiets(findDiet);
      res.send("Receta creada con éxito");
    } else {
      res.status(404).send("Falta datos");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
