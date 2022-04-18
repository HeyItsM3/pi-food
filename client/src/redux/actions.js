import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_ID = "GET_BY_ID";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DIETS = "GET_DIETS";

export function getRecipes() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: GET_RECIPES,
      payload: response.data,
    });
  };
}

export function getById(id) {
  return async function (dispatch) {
    let response = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: [...response.data],
    });
  };
}

export function searchByName(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({
        type: SEARCH_RECIPES,
        payload: [...response.data],
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post("http://localhost:3001/recipes", payload);
      dispatch({
        type: POST_RECIPE,
      });
      return post;
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/types");
      dispatch({
        type: GET_DIETS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
