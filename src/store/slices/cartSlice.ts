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
  checked: boolean,
  createdAt: string,
  updatedAt: string
}

interface UpdateCheckedAllPayload {
  checked: boolean,
  updatedAt: string
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
    },
    updateCheckedAll: (state, { payload }: PayloadAction<UpdateCheckedAllPayload>) => {
      const { checked, updatedAt } = payload
      state.cartItems = state.cartItems.map((item: CartItem) => {
        return {
          productInfo: {
            ...item.productInfo
          },
          cartInfo: {
            ...item.cartInfo,
            checked,
            updatedAt
          }
        }
      })
    }
  }
})

export const { putCartItem, updateCartItems, updateCheckedAll } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.cartItems
export const selectCartItemsCount = (state: RootState) => state.cart.cartItems.length

export default cartSlice.reducer
