import { combineReducers } from "redux";
import {
  registerUserReducer,
  loginUserReducer,
  getUsersReducer,
  getUserReducer,
} from "./reducers/user";

import {
  registerTravelReducer,
  getTravelsReducer,
  updateTravelReducer,
  deleteTravelReducer,
} from "./reducers/travel";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  allUsers: getUsersReducer,
  singleUser: getUserReducer,
  createdTravel: registerTravelReducer,
  getTravels: getTravelsReducer,
  updateTravel: updateTravelReducer,
  deleteTravel: deleteTravelReducer,
});
