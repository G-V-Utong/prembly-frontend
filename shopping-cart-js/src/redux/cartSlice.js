import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {} // { [productId]: { id, name, price, image, quantity } }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1
      } else {
        state.items[product.id] = { ...product, quantity: 1 }
      }
    },
    increment: (state, action) => {
      const id = action.payload
      if (state.items[id]) state.items[id].quantity += 1
    },
    decrement: (state, action) => {
      const id = action.payload
      if (state.items[id]) {
        state.items[id].quantity -= 1
        if (state.items[id].quantity <= 0) delete state.items[id]
      }
    },
    removeItem: (state, action) => {
      const id = action.payload
      delete state.items[id]
    },
    clearCart: (state) => {
      state.items = {}
    }
  }
})

export const { addToCart, increment, decrement, removeItem, clearCart } = cartSlice.actions

export const selectCartArray = (state) => Object.values(state.cart.items)
export const selectCartCount = (state) => Object.values(state.cart.items).reduce((acc, it) => acc + it.quantity, 0)
export const selectCartTotal = (state) => Object.values(state.cart.items).reduce((acc, it) => acc + it.price * it.quantity, 0)

export default cartSlice.reducer
