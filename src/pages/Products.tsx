import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon
} from '@material-ui/icons'
import { getProductItemsUsingPaging, IProductItem } from '../services/productService'
import useQuery from '../utils/useQuery'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
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

function getPageNumberFromQuery (value: string | null): number {
  const DEFAULT_PAGE_NUMBER = 1

  if (value === null) {
    return DEFAULT_PAGE_NUMBER
  }

  const parsed = parseInt(value)

  if (isNaN(parsed)) {
    return DEFAULT_PAGE_NUMBER
  }

  if (parsed < 1) {
    return DEFAULT_PAGE_NUMBER
  }

  return parsed
}

function Products () {
  const classes = useStyles()
  const [productItems, setProductItems] = useState<IProductItem[] | null>(null)
  const query = useQuery()

  useEffect(() => {
    const pageNumber = getPageNumberFromQuery(query.get('page'))

    setProductItems(getProductItemsUsingPaging({ pageNumber }))
  }, [])

  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {productItems !== null && productItems.map((productItem) => (
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
                    {productItem.price}원
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
          ))}
        </Grid>
      </Container>
    </main>
  )
}

export default Products
