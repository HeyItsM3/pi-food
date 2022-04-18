import {
  GET_RECIPES,
  GET_BY_ID,
  SEARCH_RECIPES,
  POST_RECIPE,
  GET_DIETS,
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

    default:
      return state;
  }
};

export default rootReducer;
