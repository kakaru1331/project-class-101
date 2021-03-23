import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core'
import {
  RemoveCircleOutlineSharp as RemoveCircleOutlineSharpIcon,
  PauseCircleFilledSharp as PauseCircleFilledSharpIcon
} from '@material-ui/icons'

const useStyles = makeStyles({
  container: {
    marginTop: '32px'
  },
  card: {
    width: '100%',
    padding: '32px'
  },
  cardContent: {
    textAlign: 'center'
  },
  priceMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    display: 'inline-block'
  },
  removeCircle: {
    height: '20px',
    verticalAlign: 'text-bottom',
    color: 'gray'
  }
})

function PriceSummary () {
  const classes = useStyles()

  return (
    <Container maxWidth="md">
      <Grid container justify="center" className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" className={classes.priceMessage}>
              총 상품가격 <strong>{1000}</strong> 원
            </Typography>
            <RemoveCircleOutlineSharpIcon className={classes.removeCircle} />
            <Typography variant="h5" className={classes.priceMessage}>
              할인금액 <strong>{1000}</strong> 원
            </Typography>
            <PauseCircleFilledSharpIcon />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  )
}

export default PriceSummary
