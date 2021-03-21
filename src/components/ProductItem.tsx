import React from 'react'
import { Typography, Grid, Card, CardMedia, CardContent, Button } from '@material-ui/core'
import {
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'

import { IProductItem } from '../services/productService'
import { selectCartItems, putCartItem, CartItem, updateCartItems } from '../store/slices/cartSlice'
interface IProps {
  productItem: IProductItem
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: 0,
    maxHeight: '60px'
  },
  controllArea: {
    paddingRight: '5px',
    paddingBottom: '10px'
  },
  cart: {
    color: 'black',
    minWidth: 0
  }
}))

function ProductItem (props: IProps) {
  const { productItem } = props
  const classes = useStyles()
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const handleCartClick = () => {
    if (!isItemAlreadyIn()) {
      putItem()
    } else {
      updateItem(productItem.id)
    }
  }

  const isItemAlreadyIn = () => {
    return cartItems.some((cartItem) => {
      return cartItem.productInfo.id === productItem.id
    })
  }

  const putItem = () => {
    const now = new Date().toISOString().slice(0, 19)
    const cartItem: CartItem = {
      productInfo: productItem,
      cartInfo: {
        amount: 1,
        createdAt: now,
        updatedAt: now
      }
    }
    dispatch(putCartItem(cartItem))
  }

  const updateItem = (productId: string) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (productId !== cartItem.productInfo.id) {
        return cartItem
      }

      const { amount, createdAt } = cartItem.cartInfo
      const now = new Date().toISOString().slice(0, 19)
      const updatedCartItem: CartItem = {
        productInfo: cartItem.productInfo,
        cartInfo: {
          amount: amount + 1,
          createdAt: createdAt,
          updatedAt: now
        }
      }

      return updatedCartItem
    })

    dispatch(updateCartItems(updatedCartItems))
  }

  const handleRemoveClick = () => {
    removeItem(productItem.id)
  }

  const removeItem = (productId: string) => {
    const updatedCartItems = cartItems.filter((cartItem) => {
      return cartItem.productInfo.id !== productId
    })

    dispatch(updateCartItems(updatedCartItems))
  }

  const canRemoveItem = cartItems.some((cartItem) => {
    return cartItem.productInfo.id === productItem.id
  })

  return (
    <Grid item key={productItem.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={productItem.coverImage}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom>
            {productItem.title}
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography>
            {productItem.price.toLocaleString()}원
          </Typography>
        </CardContent>
        <Grid container justify="flex-end"
          className={classes.controllArea}
        >
          {canRemoveItem
            ? <Button size="small" color="primary" onClick={handleRemoveClick}>
                <RemoveShoppingCartIcon className={classes.cart}/>
              </Button>
            : <Button size="small" color="primary" onClick={handleCartClick}>
                <ShoppingCartIcon className={classes.cart}/>
              </Button>
          }
        </Grid>
      </Card>
    </Grid>
  )
}

export default ProductItem
