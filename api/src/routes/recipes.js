const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

const getApiRecipes = async () => {
  try {
    const getApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    const recipes = getApi.data?.results.map((elem) => {
      return {
        id: elem.id,
        name: elem.title,
        image: elem.image,
        rating: elem.spoonacularScore,
        dishTypes: elem.dishTypes.map((d) => {
          return { name: d };
        }),
        diets: elem.diets.map((d) => {
          return { name: d };
        }),
        summary: elem.summary,
        healthScore: elem.healthScore,
        steps: elem.analyzedInstructions,
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
  const { name } = req.query;
  let allRecipes = await getAllRecipes();

  try {
    if (!name) {
      res.send(allRecipes);
    } else {
      let recipeName = await allRecipes.filter((r) =>
        r.name.toLowerCase().includes(name.toLowerCase())
      );
      if (recipeName.length === 0) {
        res.send([]);
      } else {
        res.status(200).send(recipeName);
      }
    }
  } catch (error) {
    res.status(404).send(error);
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

    if (name && summary && rating && health && steps) {
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
