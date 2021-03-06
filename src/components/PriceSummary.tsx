import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core'
import {
  RemoveCircleOutlineSharp as RemoveCircleOutlineSharpIcon,
  PauseCircleFilledSharp as PauseCircleFilledSharpIcon
} from '@material-ui/icons'
import { useSelector } from 'react-redux'

import { selectCartItems } from '../store/slices/cartSlice'

import { ICoupon } from '../services/couponService'

interface IProps {
  selectedCoupon: ICoupon | null
}

const useStyles = makeStyles({
  container: {
    marginTop: '32px'
  },
  card: {
    width: '100%',
    padding: '32px'
  },
  cardContent: {
    textAlign: 'center'
  },
  priceMessage: {
    textAlign: 'center',
    fontSize: '0.9rem',
    display: 'inline-block'
  },
  removeCircle: {
    height: '20px',
    verticalAlign: 'text-bottom',
    color: 'gray',
    margin: '0 3px'
  },
  eqaulCircle: {
    transform: 'rotate(90deg)',
    height: '20px',
    verticalAlign: 'text-bottom',
    margin: '0 3px'
  },
  strong: {
    fontSize: '1.2rem'
  },
  totalPrice: {
    fontSize: '1.2rem',
    color: 'red'
  }
})

function PriceSummary (props: IProps) {
  const { selectedCoupon } = props
  const classes = useStyles()
  const cartItems = useSelector(selectCartItems)
  const [productsPrice, setProductsPrice] = useState(0)
  const [discounted, setDiscounted] = useState(0)

  useEffect(() => {
    const reducedPrice = cartItems.reduce((acc, cur) => {
      if (!cur.cartInfo.checked) {
        return acc
      }

      return acc + (cur.productInfo.price * cur.cartInfo.amount)
    }, 0)

    setProductsPrice(reducedPrice)

    if (selectedCoupon) {
      if (productsPrice && selectedCoupon.type === 'rate' && selectedCoupon?.discountRate) {
        const couponApplicablePrice = cartItems.reduce((acc, cur) => {
          if ((cur.cartInfo.checked === false) || cur.productInfo.availableCoupon === false) {
            return acc
          }

          return acc + (cur.productInfo.price * cur.cartInfo.amount)
        }, 0)

        const sale = Math.floor(couponApplicablePrice * (selectedCoupon.discountRate / 100))
        setDiscounted(sale)
      } else if (selectedCoupon.type === 'amount' && selectedCoupon?.discountAmount) {
        setDiscounted(selectedCoupon.discountAmount)
      }
    } else {
      setDiscounted(0)
    }
  }, [cartItems, selectedCoupon])

  return (
    <Container maxWidth="md">
      <Grid container justify="center" className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" className={classes.priceMessage}>
              ??? ???????????? <strong className={classes.strong}>{productsPrice.toLocaleString()}</strong> ???
            </Typography>
            <RemoveCircleOutlineSharpIcon className={classes.removeCircle} />
            <Typography variant="h5" className={classes.priceMessage}>
              ???????????? <strong className={classes.strong}>{discounted.toLocaleString()}</strong> ???
            </Typography>
            <PauseCircleFilledSharpIcon className={classes.eqaulCircle} />
            <Typography variant="h5" className={classes.priceMessage}>
              ??? ?????? ?????? <strong className={classes.totalPrice}>{(productsPrice - discounted).toLocaleString()}</strong> ???
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default PriceSummary
