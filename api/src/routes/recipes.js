const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

const getApiRecipes = async () => {
  try {
    const getApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=90909f927ead4070a8f19d2a49a06bab&addRecipeInformation=true&number=10`
    );
    const recipes = getApi.data?.results.map((elem) => {
      return {
        id: elem.id,
        title: elem.title,
      };
    });
    return recipes;
  } catch (err) {
    console.log("Error en getApiRecipes: ", err);
  }
};

const getDbRecipes = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (err) {
    console.log("Error en getDbRecipes: ", err);
  }
};

const getAllRecipes = async () => {
  try {
    const api = await getApiRecipes();
    const db = await getDbRecipes();
    const allRecipes = api.concat(db);
    return allRecipes;
  } catch (err) {
    console.log("Error en getAllRecipes: ", err);
  }
};

router.get("/", async (req, res) => {
  const name = req.query.name;
  const allRecipes = await getAllRecipes();

  if (name) {
    let recipesName = allRecipes.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    recipesName.length
      ? res.status(200).send(recipesName)
      : res.status(404).send("Error al obtener por nombre");
  } else {
    res.status(200).send(allRecipes);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const allRecipes = await getAllRecipes();
  if (id) {
    let recipeId = allRecipes.filter((e) => e.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("Error al obtener por id");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, summary, rating, health, steps, image, diets } = req.body;

    const recipeCreate = await Recipe.create({
      name,
      summary,
      rating,
      health,
      steps,
      image,
    });

    if (name && score && resume && steps && health) {
      const diet = await Diet.findAll({ where: { name: diets } });
      recipeCreate.addDiets(diet);
      res.status(200).send({ msg: "Se crearon los recipientes" });
    } else {
      res.status(400).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
