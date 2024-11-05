import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },

    // TODO: HW
    // addToCart
    // removeFromCart
    // resetCart
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
