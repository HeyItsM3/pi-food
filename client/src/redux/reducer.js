import {
  GET_RECIPES,
  GET_BY_ID,
  SEARCH_RECIPES,
  POST_RECIPE,
  GET_DIETS,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "./actions";

const initialState = {
  recipes: [],
  filterRecipes: [],
  detail: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload,
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
      const allRecipes = state.filterRecipes;
      const dietsFilter =
        action.payload === "All"
          ? allRecipes
          : allRecipes.filter((recipe) =>
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
      let orderRecipes =
        action.payload === "asc"
          ? state.filterRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.filterRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        filterRecipes: orderRecipes,
      };

    case ORDER_BY_RATING:
      let rating =
        action.payload === "high"
          ? state.filterRecipes.sort(function (a, b) {
              return b.rating - a.rating;
            })
          : state.filterRecipes.sort(function (a, b) {
              return a.rating - b.rating;
            });

      return {
        ...state,
        recipes: rating,
      };

    default:
      return state;
  }
};

export default rootReducer;
