import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_BY_ID = "GET_BY_ID";

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
