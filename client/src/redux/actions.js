/* eslint-disable no-use-before-define */
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

export const getRecipes = () => async (dispatch) => {
  try {
    return await fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: GET_RECIPES,
          payload: [...res],
        });
      })
      .catch((error) => error.message);
  } catch (error) {
    console.error(error);
  }
};

export const getById = (id) => (dispatch) => {
  try {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((res) =>
        dispatch({
          type: GET_BY_ID,
          payload: [...res],
        })
      )
      .catch((error) => error.message);
  } catch (error) {
    console.error(error);
  }
};

export const getDiets = () => (dispatch) => {
  try {
    fetch("http://localhost:3001/types")
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: GET_DIETS,
          payload: res,
        });
      });
  } catch (error) {
    console.error(error);
  }
};

export const postRecipe = (payload) => async (dispatch) => {
  try {
    return await fetch("http://localhost:3001/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(dispatch({ type: POST_RECIPE }))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error);
  }
};

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
