import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { asyncImport } from './helpers';

const Home = asyncImport(import("./pages/home"))
const Product = asyncImport(import("./pages/product"))
const NotFound = asyncImport(import("./pages/notfound"))

/* Use components to define routes */
export default () =>
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" exact component={Product} />
      <Route component={NotFound} />
    </Switch>
  </Router>
