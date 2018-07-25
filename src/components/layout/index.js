import React from 'react'
import { Route } from "react-router-dom"
import { linkResolver } from '../prismic'
import { Link as PrismicLink } from 'prismic-reactjs'
import { Link } from 'react-router-dom'


export default function DefaultLayout ({component: MatchedPage, layout, ...rest}) {
  return (
    <Route {...rest} render={matchProps => {
      const headerItems = layout.data.header_nav_items.map((item, index) =>
        <Link key={index} className="header-nav-link" to={PrismicLink.url(item.link, linkResolver)}>
          {item.text}
        </Link>
      )

      const socialItems = layout.data.footer_social_items.map((item, index) => {
        return (
          <a
            key={index}
            className="footer-social-item"
            href={item.link.url}
            target={item.link.target || ''}
            rel={item.link.target ? 'noopener' : ''}
          >
            <img src={item.icon.url} alt={item.icon.alt} />
          </a>
        )
      })

      const navItems = layout.data.footer_nav_items.map((item, index) =>
        <Link key={index} className="footer-nav-link" to={PrismicLink.url(item.link)}>
          {item.text}
        </Link>
      )
      return (
        <React.Fragment>
          <div className="header" id="header">
            <div className="header-inner">
              <Link className="header-name" to="/">
                {layout.data.site_name}
              </Link>
              <nav className="header-nav">
                {headerItems}
              </nav>
              <div className="header-burger" id="header-burger">
                <img className="header-burger-img header-burger-img--closed" src="/img/burger-closed.svg" alt="Mobile menu toggle - closed state" />
                <img className="header-burger-img header-burger-img--opened" src="/img/burger-opened.svg" alt="Mobile menu toggle - opened state" />
              </div>
            </div>
          </div>

          <main>
            <MatchedPage {...matchProps} />
          </main>

          <footer className="footer">
            <div className="footer-inner">
              <div>
                <p className="footer-name">
                  {layout.data.site_name}
                </p>
                <div className="footer-social-items">
                  {socialItems}
                </div>
              </div>
              <nav className="footer-nav">
                {navItems}
              </nav>
            </div>
        </footer>
        </React.Fragment>
      )
    }} />
  )
}