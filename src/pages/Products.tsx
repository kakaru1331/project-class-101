import React from 'react'
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon
} from '@material-ui/icons'

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
    paddingBottom: 0
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

const cards = [1, 2, 3, 4, 5]

function Products () {
  const classes = useStyles()

  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Product Name
                  </Typography>
                  <Typography>
                    Price
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
