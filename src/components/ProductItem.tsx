import React from 'react'
import { Typography, Grid, Card, CardMedia, CardContent, Button } from '@material-ui/core'
import {
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { IProductItem } from '../services/productService'

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
          <Button size="small" color="primary">
            <ShoppingCartIcon className={classes.cart}/>
          </Button>
          <Button size="small" color="primary">
            <RemoveShoppingCartIcon className={classes.cart}/>
          </Button>
        </Grid>
      </Card>
    </Grid>
  )
}

export default ProductItem
