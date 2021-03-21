import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

export default store
export const useAppDispatch = () => useDispatch()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
