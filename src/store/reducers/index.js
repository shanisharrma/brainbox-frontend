import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

// * configure redux-persist for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "roles"],
};

// * configure redux-persist for cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["totalItems", "cartItems"],
};

// * configure redux-persist for profile slice
const profilePersistConfig = {
  key: "profile",
  storage,
  whitelist: ["user"],
};

// * wrap authReducer with persist reducer
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
// * wrap authReducer with persist reducer
const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);
// * wrap profileReducer with persist reducer
const persistProfileReducer = persistReducer(
  profilePersistConfig,
  profileReducer
);

const rootReducer = combineReducers({
  auth: persistAuthReducer,
  profile: persistProfileReducer,
  cart: persistCartReducer,
  course: courseReducer,
  viewCourse: viewCourseReducer,
});

export default rootReducer;
