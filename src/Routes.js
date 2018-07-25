import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { asyncImport } from './helpers';

const Layout = asyncImport(import("./components/layout"))
const Home = asyncImport(import("./pages/home"))
const Products = asyncImport(import("./pages/products"))
const Product = asyncImport(import("./pages/product"))
const BlogHome = asyncImport(import("./pages/bloghome"))
const BlogPost = asyncImport(import("./pages/blogpost"))
const NotFound = asyncImport(import("./pages/notfound"))

/* Use components to define routes */
export default ({layout}) =>
  <Router>
    <Switch>
      <Layout layout={layout} path="/" exact component={Home} />
      <Layout layout={layout} path="/products" exact component={Products} />
      <Layout layout={layout} path="/products/:uid" exact component={Product} />
      <Layout layout={layout} path="/blog" exact component={BlogHome} />
      <Layout layout={layout} path="/blog/:uid" exact component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  </Router>
