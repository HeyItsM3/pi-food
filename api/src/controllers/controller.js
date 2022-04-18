const { API_KEY, API_KEY_2 } = process.env;
const { Recipe, Diet } = require("../db");
const axios = require("axios");

const getApi = async () => {
  const url = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=2`
  );
  try {
    const result = url.data.results.map((element) => {
      return {
        id: element.id, // - ID: *
        name: element.title, // - Nombre *
        image: element.image,
        rating: element.spoonacularScore, // - Puntuación
        summary: element.summary, // - Resumen del plato *
        health: element.healthScore, // - Nivel de "comida saludable"
        time: element.readyInMinutes,
        dishTypes: element.dishTypes.map((dish) => {
          return { name: dish };
        }),
        diets: element.diets.map((diet) => {
          return { name: diet };
        }),
        instructions: element.analyzedInstructions[0]?.steps.map((each) => {
          return each.step;
        }), // - Paso a paso
      };
    });
    return result;
  } catch (error) {
    console.error("Al traer de la api" + error);
  }
};

const getDB = async () => {
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
  } catch (error) {
    console.error("Al traer de la db" + error);
  }
};

const getAllRecipes = async () => {
  try {
    const api = await getApi();
    const db = await getDB();
    const allData = [...api, ...db];
    return allData;
  } catch (error) {
    console.error("Al obtener todos las recetas " + error);
  }
};

module.exports = getAllRecipes;
