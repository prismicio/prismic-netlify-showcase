import React from 'react'
import { Route } from "react-router-dom"
import { linkResolver } from '../prismic'
import { Link as PrismicLink } from 'prismic-reactjs'
import { Link } from 'react-router-dom'


export default function ({component: MatchedPage, layout, ...rest}) {
  return (
  <Route {...rest} layout={layout} render={ () => <LayoutComponent {...rest} MatchedPage={MatchedPage} layout={layout} /> } />
  )
}

class LayoutComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this)
  }

  handleMenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClickMenuItem() {
    this.setState({ menuOpen: false })
  }

  render() {
    const MatchedPage = this.props.MatchedPage

    const headerItems = this.props.layout.data.header_nav_items.map((item, index) =>
      <Link onClick={this.handleClickMenuItem} key={index} className="header-nav-link" to={PrismicLink.url(item.link, linkResolver)}>
        {item.text}
      </Link>
    )

    const socialItems = this.props.layout.data.footer_social_items.map((item, index) => {
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

    const navItems = this.props.layout.data.footer_nav_items.map((item, index) =>
      <Link key={index} className="footer-nav-link" to={PrismicLink.url(item.link)}>
        {item.text}
      </Link>
    )
    return (
      <React.Fragment>
        <div className={`header${this.state.menuOpen ? ' header--is-nav-opened' : ''}`} id="header">
          <div className="header-inner">
            <Link className="header-name" to="/">
              {this.props.layout.data.site_name}
            </Link>
            <nav className="header-nav">
              {headerItems}
            </nav>
            <div className="header-burger" id="header-burger" onClick={this.handleMenuOpen}>
              <img className="header-burger-img header-burger-img--closed" src="/img/burger-closed.svg" alt="Mobile menu toggle - closed state" />
              <img className="header-burger-img header-burger-img--opened" src="/img/burger-opened.svg" alt="Mobile menu toggle - opened state" />
            </div>
          </div>
        </div>

        <main>
          <MatchedPage {...this.props} />
        </main>

        <footer className="footer">
          <div className="footer-inner">
            <div>
              <p className="footer-name">
                {this.props.layout.data.site_name}
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
  }
}