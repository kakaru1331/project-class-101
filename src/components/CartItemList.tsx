import React, { ChangeEvent } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControlLabel, Checkbox } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from './CartItem'
import { selectCartItems, updateCheckedAll } from '../store/slices/cartSlice'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const useStyles = makeStyles((theme) => ({
  tableGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  table: {
    minWidth: 700
  }
}))

function CartItemList () {
  const classes = useStyles()
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const now = new Date().toISOString().slice(0, 19)

    const payload = {
      checked: isChecked,
      updatedAt: now
    }

    dispatch(updateCheckedAll(payload))
  }

  return (
    <Container className={classes.tableGrid} maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      onChange={handleSelectChange}
                    />
                  }
                  label="전체선택"
                />
              </StyledTableCell>
              <StyledTableCell>상품정보</StyledTableCell>
              <StyledTableCell>상품금액</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.productInfo.id} />
            ))
          }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default CartItemList
