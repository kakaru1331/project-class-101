import React, { ChangeEvent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { getCoupons, ICoupon } from '../services/couponService'
import { selectCartItems } from '../store/slices/cartSlice'

interface ICouponForSelect extends ICoupon {
  disabled: boolean
}

interface IProps {
  updateCallback: Function,
  selectedCoupon: ICoupon | null
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

function Coupon (props: IProps) {
  const { updateCallback, selectedCoupon } = props
  const classes = useStyles()
  const [couponValue, setCouponValue] = useState<string>('')
  const [couponsForSelect, setCouponsForSelect] = useState<ICouponForSelect[]>()
  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    const coupons = getCoupons()

    const hasCheckedItem = cartItems.some((item) => {
      return item.cartInfo.checked
    })

    const availableCoupon = cartItems.some((item) => {
      return item.cartInfo.checked && item.productInfo.availableCoupon !== false
    })

    const isCouponforbidden = (!hasCheckedItem || !availableCoupon)
    const mapped = coupons.map(item => {
      return {
        ...item,
        disabled: isCouponforbidden
      }
    })
    setCouponsForSelect(mapped)
  }, [cartItems])

  useEffect(() => {
    if (selectedCoupon === null) {
      setCouponValue('')
    }
  }, [selectedCoupon])

  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
    const couponType = event.target.value as string
    setCouponValue(couponType)

    if (couponsForSelect) {
      const coupon = couponsForSelect.find((item) => {
        return item.type === couponType
      })

      updateCallback(coupon)
    }
  }

  return (
    <Container maxWidth="md">
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="placeholder-label-label">
          쿠폰
        </InputLabel>
        <Select
          labelId="placeholder-label-label"
          id="placeholder-label"
          value={couponValue}
          onChange={handleSelectChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            쿠폰 선택
          </MenuItem>
          {
          couponsForSelect && couponsForSelect.map(item => {
            return (
              <MenuItem
                value={item.type}
                key={item.type}
                disabled={item.disabled}
              >
                {item.title}
              </MenuItem>
            )
          })
          }
        </Select>
      </FormControl>
    </Container>
  )
}

export default Coupon
