import React from 'react'
import { useSelector } from 'react-redux'

import { selectCartItemsCount } from '../store/slices/cartSlice'
import EmptyCart from '../components/EmptyCart'

function Cart () {
  const cartItemsCount = useSelector(selectCartItemsCount)

  return (
    <main>
      {cartItemsCount === 0
        ? <EmptyCart />
        : <h1>Cart</h1>
      }
    </main>
  )
}

export default Cart
