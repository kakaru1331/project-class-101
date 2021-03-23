import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCartItemsCount } from '../store/slices/cartSlice'
import EmptyCart from '../components/EmptyCart'
import CartItemList from '../components/CartItemList'
import Coupon from '../components/Coupon'
import PriceSummary from '../components/PriceSummary'

import { ICoupon } from '../services/couponService'

function Cart () {
  const cartItemsCount = useSelector(selectCartItemsCount)
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon|null>(null)

  const updateSelectedCoupon = (coupon: ICoupon | null) => {
    setSelectedCoupon(coupon)
  }

  return (
    <main>
      {cartItemsCount === 0 && <EmptyCart />}
      {cartItemsCount > 0 &&
      <React.Fragment>
        <CartItemList updateCallback={updateSelectedCoupon} />
        <Coupon updateCallback={updateSelectedCoupon} selectedCoupon={selectedCoupon} />
        <PriceSummary selectedCoupon={selectedCoupon} />
      </React.Fragment>
       }
    </main>
  )
}

export default Cart
