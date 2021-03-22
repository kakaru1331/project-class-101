import React from 'react'
import { AppBar, CssBaseline, Toolbar, Typography, Grid, Badge } from '@material-ui/core'
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons'
import {
  Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCartItemsCount } from '../../store/slices/cartSlice'

function DefaultHeader () {
  const cartItemsCount = useSelector(selectCartItemsCount)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ background: '#FFF' }}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" noWrap style={{ color: '#000' }}>
              CLASS101
            </Typography>
          </Link>
          <Grid container justify="flex-end">
            <Link to="/cart">
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCartIcon style={{ color: 'black' }} />
              </Badge>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default DefaultHeader
