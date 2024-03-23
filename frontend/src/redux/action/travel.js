import axios from "axios";

import {
  CREATE_TRAVEL_ERROR,
  CREATE_TRAVEL_REQUEST,
  CREATE_TRAVEL_SUCCESS,
  GET_TRAVELS_ERROR,
  GET_TRAVELS_REQUEST,
  GET_TRAVELS_SUCCESS,
  DELETE_TRAVEL_SUCCESS,
  DELETE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_SUCCESS,
  UPDATE_TRAVEL_ERROR,
  DELETE_TRAVEL_ERROR,
} from "../constants/travel";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const userInfoFromLocalStorage = localStorage.getItem("travelUserInfo")
  ? JSON.parse(localStorage.getItem("travelUserInfo"))
  : null;

const baseUrl = "http://localhost:4500";

export const createTravelAction = (formData) => async (dispatch, state) => {
  dispatch({
    type: CREATE_TRAVEL_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  try {
    //make API call
    const { data } = await axios.post(`${baseUrl}/travel`, formData, config);
    //2. after the API call success
    console.log(data, "data");
    dispatch({
      type: CREATE_TRAVEL_SUCCESS,
      payload: data.data,
    });
    console.log(data);
  } catch (error) {
    //3. after the API call failure
    console.log(error);
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_TRAVEL_ERROR,
      payload: message,
    });
  }
};

export const getTasksAction = () => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_TRAVELS_REQUEST,
    });

    // make the call
    const { data } = await axios.get(
      `${baseUrl}/travel?id=${userInfoFromLocalStorage.data?._id}`,

      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_TRAVELS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_TRAVELS_ERROR,
      payload: message,
    });
  }
};

export const deleteTaskAction = (id) => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: DELETE_TRAVEL_REQUEST,
    });
    // make the call
    const { data } = await axios.delete(`${baseUrl}/travel/${id}`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: DELETE_TRAVEL_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: DELETE_TRAVEL_ERROR,
      payload: message,
    });
  }
};

export const updateTaskAction = (id, formData) => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: UPDATE_TRAVEL_REQUEST,
    });
    // make the call
    const { data } = await axios.patch(
      `${baseUrl}/travel/${id}`,
      formData,
      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: UPDATE_TRAVEL_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    toast.error(message);
    dispatch({
      type: UPDATE_TRAVEL_ERROR,
      payload: message,
    });
  }
};
