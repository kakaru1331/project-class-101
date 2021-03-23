import React, { ChangeEvent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import { getCoupons, ICoupon } from '../services/couponService'

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

  useEffect(() => {
    const coupons = getCoupons()
    const mapped = coupons.map(item => {
      return {
        ...item,
        disabled: false
      }
    })

    setCouponsForSelect(mapped)

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
