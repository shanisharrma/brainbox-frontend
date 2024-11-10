import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";

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

// * wrap authReducer with persist reducer
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
// * wrap authReducer with persist reducer
const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  auth: persistAuthReducer,
  profile: profileReducer,
  cart: persistCartReducer,
});

export default rootReducer;
