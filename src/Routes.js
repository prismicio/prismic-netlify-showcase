import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import AsyncComponent from './components/helpers/AsyncComponent'

const Home = AsyncComponent(() => import("./pages/home"))
const Product = AsyncComponent(() => import("./pages/product"))
const NotFound = AsyncComponent(() => import("./pages/notfound"))

/* Use components to define routes */
export default () =>
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/posts/:id" exact component={Product} />
      <Route component={NotFound} />
    </Switch>
  </Router>
