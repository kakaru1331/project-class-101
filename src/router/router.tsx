import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import DefaultHeader from '../components/layouts/DefaultHeader'
import Products from '../pages/Products'

function RootRouter () {
  return (
    <Router>
      <React.Fragment>
        <DefaultHeader />
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="*">
            <Redirect from="*" to="/products" />
          </Route>
        </Switch>
      </React.Fragment>
    </Router>
  )
}

export default RootRouter
