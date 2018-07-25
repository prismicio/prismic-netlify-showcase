import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { asyncImport } from './helpers';

const Home = asyncImport(import("./pages/home"))
const Products = asyncImport(import("./pages/products"))
const Product = asyncImport(import("./pages/product"))
const BlogHome = asyncImport(import("./pages/bloghome"))
const BlogPost = asyncImport(import("./pages/blogpost"))
const NotFound = asyncImport(import("./pages/notfound"))

/* Use components to define routes */
export default () =>
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/:uid" exact component={Product} />
      <Route path="/blog" exact component={BlogHome} />
      <Route path="/blog/:uid" exact component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  </Router>
