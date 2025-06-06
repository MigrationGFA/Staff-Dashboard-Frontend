import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/authentication";
import profileReducer from "./features/profile";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
