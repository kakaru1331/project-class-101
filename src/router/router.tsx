import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import DefaultHeader from '../components/layouts/DefaultHeader'
import DefaultFooter from '../components/layouts/DefaultFooter'
import Products from '../pages/Products'
import Cart from '../pages/Cart'

function RootRouter () {
  return (
    <Router>
      <React.Fragment>
        <DefaultHeader />
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="*">
            <Redirect from="*" to="/products" />
          </Route>
        </Switch>
        <DefaultFooter />
      </React.Fragment>
    </Router>
  )
}

export default RootRouter
