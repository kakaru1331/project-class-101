import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

function Alert (props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default Alert
