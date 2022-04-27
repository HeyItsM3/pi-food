/* eslint-disable array-callback-return */
import {
  GET_RECIPES,
  GET_BY_ID,
  SEARCH_RECIPES,
  POST_RECIPE,
  GET_DIETS,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  CLEAN_DETAIL,
} from "../constants/urls";

const initialState = {
  recipes: [],
  copyRecipes: [],
  detail: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
        // Copia para filter
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case POST_RECIPE:
      return {
        ...state,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_DIET:
      const filterRecipes = state.copyRecipes;
      const dietsFilter =
        action.payload === "diet"
          ? state.copyRecipes
          : filterRecipes.filter((recipe) =>
              recipe.diets.find((diet) => {
                if (diet.name === action.payload) {
                  return recipe;
                }
              })
            );
      return {
        ...state,
        recipes: dietsFilter,
      };

    case ORDER_BY_NAME:
      let orderBy =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0; //
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderBy,
      };

    case ORDER_BY_RATING:
      let rating =
        action.payload === "high"
          ? state.recipes.sort(function (a, b) {
              return b.rating - a.rating;
            })
          : state.recipes.sort(function (a, b) {
              return a.rating - b.rating;
            });
      return {
        ...state,
        recipes: rating,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
