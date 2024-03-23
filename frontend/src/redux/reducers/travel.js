import {
  CREATE_TRAVEL_ERROR,
  CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_REQUEST,
  CREATE_TRAVEL_RESET,
  CREATE_TRAVEL_CLEAR_ERROR,
  GET_TRAVELS_CLEAR_ERROR,
  GET_TRAVELS_REQUEST,
  GET_TRAVELS_SUCCESS,
  GET_TRAVELS_RESET,
  GET_TRAVELS_ERROR,
  UPDATE_TRAVEL_CLEAR_ERROR,
  UPDATE_TRAVEL_REQUEST,
  UPDATE_TRAVEL_SUCCESS,
  UPDATE_TRAVEL_RESET,
  UPDATE_TRAVEL_ERROR,
  DELETE_TRAVEL_REQUEST,
  DELETE_TRAVEL_CLEAR_ERROR,
  DELETE_TRAVEL_RESET,
  DELETE_TRAVEL_SUCCESS,
  DELETE_TRAVEL_ERROR,
} from "../constants/travel";

export const registerTravelReducer = (
  state = { booking: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_TRAVEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        booking: action.payload,
      };

    case CREATE_TRAVEL_RESET:
      return {
        loading: false,
        success: false,
        booking: [],
        error: null,
      };

    case CREATE_TRAVEL_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CREATE_TRAVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getTravelsReducer = (
  state = { bookings: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_TRAVELS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TRAVELS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bookings: action.payload,
        error: null,
      };

    case GET_TRAVELS_RESET:
      return {
        loading: false,
        success: false,
        bookings: [],
        error: null,
      };

    case GET_TRAVELS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_TRAVELS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateTravelReducer = (
  state = { booking: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_TRAVEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        booking: action.payload,
      };

    case UPDATE_TRAVEL_RESET:
      return {
        loading: false,
        success: false,
        booking: null,
        error: null,
      };

    case UPDATE_TRAVEL_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case UPDATE_TRAVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteTravelReducer = (
  state = { booking: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case DELETE_TRAVEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TRAVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        booking: action.payload,
      };

    case DELETE_TRAVEL_RESET:
      return {
        loading: false,
        success: false,
        booking: null,
        error: null,
      };

    case DELETE_TRAVEL_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case DELETE_TRAVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
