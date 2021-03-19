import React from 'react'
import { AppBar, CssBaseline, Toolbar, Typography, Grid } from '@material-ui/core'
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons'
import {
  Link
} from 'react-router-dom'

function DefaultHeader () {
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
              <ShoppingCartIcon style={{ color: 'black' }} />
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default DefaultHeader
