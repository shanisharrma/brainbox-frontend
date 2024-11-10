import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // TODO: HW
    // addToCart
    addToCart(state, action) {
      const newItem = action.payload;
      state.cartItems.push(newItem);
      state.totalItems = state.cartItems.length;
    },
    // removeFromCart
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      state.totalItems = state.cartItems.length;
    },
    // resetCart
    resetCart(state) {
      state.cartItems = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
