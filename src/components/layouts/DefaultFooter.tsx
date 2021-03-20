import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

function DefaultFooter () {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        CLASS101
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      Building a world where anyone can live doing what they love
      </Typography>
    </footer>
  )
}

export default DefaultFooter
