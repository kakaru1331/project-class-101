import React from 'react'
import { useSelector } from 'react-redux'

import { selectCartItemsCount } from '../store/slices/cartSlice'
import EmptyCart from '../components/EmptyCart'
import CartItemList from '../components/CartItemList'

function Cart () {
  const cartItemsCount = useSelector(selectCartItemsCount)

  return (
    <main>
      {cartItemsCount === 0
        ? <EmptyCart />
        : <CartItemList />
      }
    </main>
  )
}

export default Cart
