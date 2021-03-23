import React, { ChangeEvent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import { getCoupons, ICoupon } from '../services/couponService'

interface ICouponForSelect extends ICoupon {
  disabled: boolean
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

function Coupon () {
  const classes = useStyles()
  const [selectedCoupon, setSelectedCoupon] = useState<string>()
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
  }, [])

  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCoupon(event.target.value as string)
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
          value={selectedCoupon}
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
