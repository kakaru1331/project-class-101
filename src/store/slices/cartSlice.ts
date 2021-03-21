import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProductItem } from '../../services/productService'
import { RootState } from '../store'

interface CartState {
  cartItems: CartItem[]
}

export interface CartItem {
  productInfo: IProductItem,
  cartInfo: CartInfo
}

interface CartInfo {
  amount: number,
  createdAt: String,
  updatedAt: String
}

const initialState: CartState = {
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    putCartItem: (state, { payload }: PayloadAction<CartItem>) => {
      state.cartItems = [...state.cartItems, payload]
    },
    updateCartItems: (state, { payload }: PayloadAction<CartItem[]>) => {
      state.cartItems = payload
    }
  }
})

export const { putCartItem, updateCartItems } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.cartItems

export default cartSlice.reducer
