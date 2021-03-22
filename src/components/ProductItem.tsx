import React, { useState, SyntheticEvent } from 'react'
import { Typography, Grid, Card, CardMedia, CardContent, Button, Snackbar, SnackbarCloseReason } from '@material-ui/core'
import {
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'

import { IProductItem } from '../services/productService'
import { selectCartItems, putCartItem, CartItem, updateCartItems, selectCartItemsCount } from '../store/slices/cartSlice'
import Alert from './Alert'

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
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartItemsCount = useSelector(selectCartItemsCount)

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const handleCartClick = () => {
    if (isItemAlreadyIn()) {
      updateItem(productItem.id)
      showPutMessage()
    } else {
      if (cartItemsCount < 3) {
        putItem()
        showPutMessage()
      } else {
        showLimitMessage()
      }
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
    showRemoveMessage()
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

  const showPutMessage = () => {
    setIsOpenSnackbar(true)
    setSeverity('success')
    setSnackbarMessage('장바구니에 상품을 담았습니다')
  }

  const showRemoveMessage = () => {
    setIsOpenSnackbar(true)
    setSeverity('info')
    setSnackbarMessage('장바구니에서 상품을 제외했습니다')
  }

  const handleClose = (event: SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setIsOpenSnackbar(false)
  }

  const showLimitMessage = () => {
    setIsOpenSnackbar(true)
    setSeverity('warning')
    setSnackbarMessage('장바구니는 최대 3종류의 상품까지 담을 수 있습니다')
  }

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
          <Snackbar open={isOpenSnackbar} autoHideDuration={1500} onClose={handleClose}>
            <Alert severity={severity} elevation="6" onClose={handleClose}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Card>
    </Grid>
  )
}

export default ProductItem
