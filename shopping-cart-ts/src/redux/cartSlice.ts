import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, Product } from '../../utils/types'

const initialState: CartState = {
  items: {}, // { [productId]: { id, name, price, image, quantity } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1;
      } else {
        state.items[product.id] = { ...product, quantity: 1 };
      }
    },
    increment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].quantity += 1;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].quantity -= 1;
        if (state.items[id].quantity <= 0) delete state.items[id];
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartArray = createSelector(
  (state: { cart: CartState }) => state.cart.items,
  (items) => Object.values(items)
);
export const selectCartCount = (state: { cart: CartState }) =>
  Object.values(state.cart.items).reduce((acc, it) => acc + it.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  Object.values(state.cart.items).reduce(
    (acc, it) => acc + it.price * it.quantity,
    0
  );

export default cartSlice.reducer;
