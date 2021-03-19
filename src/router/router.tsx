import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Products from '../pages/Products'

function RootRouter () {
  return (
    <Router>
      <Fragment>
        {/* @TODO: header */}

        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="*">
            <Redirect from="*" to="/products" />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  )
}

export default RootRouter
