import { GET_RECIPES, GET_BY_ID } from "./actions";

const initialState = {
  recipes: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
