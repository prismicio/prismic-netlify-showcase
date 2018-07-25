import React from 'react'
import { Link } from 'react-router-dom'

export default ({msg = "Page not found"}) =>
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>
    <div className="l-wrapper">
      <div className="not-found">
        {msg}
        <br />
        <Link to="/">Go Back to the homepage</Link>
      </div>
    </div>
  </React.Fragment>
