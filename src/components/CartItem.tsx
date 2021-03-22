import React, { ChangeEvent, FocusEvent, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableRow, Checkbox, TableCell, Typography, Grid, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'

import { CartItem as ICartItem, selectCartItems, updateCartItems } from '../store/slices/cartSlice'

interface IProps {
  cartItem: ICartItem
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  cellImage: {
    width: '150px'
  },
  image: {
    width: '100%'
  },
  cellProductInfo: {
    borderRight: '1px solid #e2e5e7'
  },
  productTitle: {
    borderBottom: '1px solid #e2e5e7',
    paddingBottom: '5px',
    letterSpacing: '-1px',
    textAlign: 'left'
  },
  controllerGrid: {
    marginTop: '5px'
  },
  select: {
    width: '50px'
  },
  input: {
    width: '50px'
  },
  unitPrice: {
    color: 'gray'
  },
  deleteIcon: {
    margin: 0,
    padding: 0
  },
  hidden: {
    display: 'none'
  }
}))

function CartItem (props: IProps) {
  const { cartItem } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const [selectQuantity, setSelectQuantity] = useState<string>('')
  const [isSelectVisible, setIsSelectVisible] = useState(false)
  const [textQuantity, setTextQuantity] = useState<string>('')
  const [isTextVisible, setIsTextVisible] = useState(false)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    initSelect()
    initText()
  }, [])

  const initSelect = () => {
    const amount = cartItem.cartInfo.amount

    if (amount <= 9) {
      const amountStr = String(amount)
      setSelectQuantity(amountStr)
      setIsSelectVisible(true)
    } else {
      setSelectQuantity('10+')
      setIsSelectVisible(false)
    }
  }

  const initText = () => {
    const amount = cartItem.cartInfo.amount
    const amountStr = String(amount)

    setTextQuantity(amountStr)

    if (amount >= 10) {
      setIsTextVisible(true)
    } else {
      setIsTextVisible(false)
    }
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const prevValue = selectQuantity

    const value = event.target.value
    const valueNumber = parseInt(value)

    setSelectQuantity(value)

    if (valueNumber <= 9) {
      setIsSelectVisible(true)

      const updatedCartItems = cartItems.map((item) => {
        if (cartItem.productInfo.id !== item.productInfo.id) {
          return item
        }

        const now = new Date().toISOString().slice(0, 19)
        const updatedCartItem: ICartItem = {
          productInfo: {
            ...item.productInfo
          },
          cartInfo: {
            ...item.cartInfo,
            amount: valueNumber,
            updatedAt: now
          }
        }

        return updatedCartItem
      })

      dispatch(updateCartItems(updatedCartItems))
    } else {
      setIsSelectVisible(false)

      setIsTextVisible(true)
      setTextQuantity(prevValue)
      textRef?.current?.focus()
    }
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCartItems = cartItems.map((item) => {
      if (cartItem.productInfo.id !== item.productInfo.id) {
        return item
      }

      const now = new Date().toISOString().slice(0, 19)
      const updatedCartItem: ICartItem = {
        productInfo: {
          ...item.productInfo
        },
        cartInfo: {
          ...item.cartInfo,
          updatedAt: now,
          checked: event.target.checked
        }
      }

      return updatedCartItem
    })

    dispatch(updateCartItems(updatedCartItems))
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/, '')
    const valueNumber = parseInt(value)
    let refined = 1

    if (value === '') {
      setTextQuantity('')
      return
    }

    if (valueNumber <= 0) {
      setTextQuantity('1')
      refined = 1
    } else if (valueNumber > 100) {
      setTextQuantity('100')
      refined = 100
    } else {
      setTextQuantity(valueNumber.toString())
      refined = valueNumber
    }

    const updatedCartItems = cartItems.map((item) => {
      if (cartItem.productInfo.id !== item.productInfo.id) {
        return item
      }

      const now = new Date().toISOString().slice(0, 19)
      const updatedCartItem: ICartItem = {
        productInfo: {
          ...item.productInfo
        },
        cartInfo: {
          ...item.cartInfo,
          amount: refined,
          updatedAt: now
        }
      }

      return updatedCartItem
    })

    dispatch(updateCartItems(updatedCartItems))
  }

  const handleTextBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value

    if (value !== '') {
      return
    }

    setTextQuantity('1')

    const updatedCartItems = cartItems.map((item) => {
      if (cartItem.productInfo.id !== item.productInfo.id) {
        return item
      }

      const now = new Date().toISOString().slice(0, 19)
      const updatedCartItem: ICartItem = {
        productInfo: {
          ...item.productInfo
        },
        cartInfo: {
          ...item.cartInfo,
          amount: 1,
          updatedAt: now
        }
      }

      return updatedCartItem
    })

    dispatch(updateCartItems(updatedCartItems))
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          checked={cartItem.cartInfo.checked}
          onChange={handleCheckboxChange}
        />
      </TableCell>
      <TableCell className={classes.cellImage}>
        <img
          src={cartItem.productInfo.coverImage}
          alt={cartItem.productInfo.title}
          className={classes.cellImage}
        />
      </TableCell>
      <TableCell align="center" className={classes.cellProductInfo}>
        <Typography className={classes.productTitle}>
          {cartItem.productInfo.title}
        </Typography>
        <Grid container className={classes.controllerGrid} justify="flex-end">
          <span className={classes.unitPrice}>
            {cartItem.productInfo.price.toLocaleString()}원
          </span>
          <span>
            {isSelectVisible &&
            <select
              className={[classes.select, (isSelectVisible ? '' : classes.hidden)].join(' ')}
              value={selectQuantity}
              onChange={handleSelectChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
            </select>
            }
          </span>
          <span>
            <input
              type="text"
              className={[classes.input, (isTextVisible ? '' : classes.hidden)].join(' ')}
              ref={textRef}
              value={textQuantity}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
            />
          </span>
          <IconButton aria-label="delete" className={classes.deleteIcon}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </TableCell>
      <TableCell align="center">
        {(cartItem.productInfo.price * cartItem.cartInfo.amount).toLocaleString()}원
      </TableCell>
    </TableRow>
  )
}

export default CartItem
