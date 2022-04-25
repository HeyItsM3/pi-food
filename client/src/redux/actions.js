import axios from "axios";
import {
  GET_RECIPES,
  GET_BY_ID,
  SEARCH_RECIPES,
  POST_RECIPE,
  GET_DIETS,
  FILTER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
} from "../constants/urls";

export const getRecipes = () => (dispatch) => {
  try {
    return fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_RECIPES,
          payload: json,
        });
      });
  } catch (error) {
    console.error(error);
  }
};

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
      console.log(err.message);
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

export function filterByDiet(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}
