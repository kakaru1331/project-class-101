import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  infoMessage: {
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  }
})

function EmptyCart () {
  const classes = useStyles()

  return (
    <Grid container justify="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.infoMessage}>
            장바구니에 담긴 상품이 없습니다.
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justify="center">
            <Link to="/products" className={classes.link}>
              <Button variant="contained" color="primary">
                쇼핑하러 가기
              </Button>
            </Link>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default EmptyCart
