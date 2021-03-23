import React from 'react'
import { useSelector } from 'react-redux'

import { selectCartItemsCount } from '../store/slices/cartSlice'
import EmptyCart from '../components/EmptyCart'
import CartItemList from '../components/CartItemList'
import Coupon from '../components/Coupon'
import PriceSummary from '../components/PriceSummary'

function Cart () {
  const cartItemsCount = useSelector(selectCartItemsCount)

  return (
    <main>
      {cartItemsCount === 0 && <EmptyCart />}
      {cartItemsCount > 0 &&
      <React.Fragment>
        <CartItemList />
        <Coupon />
        <PriceSummary />
      </React.Fragment>
       }
    </main>
  )
}

export default Cart
