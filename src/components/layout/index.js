import React from 'react'
import { Client, linkResolver } from '../prismic'
import NotFound from '../../pages/notfound'
import { Link } from 'prismic-reactjs'

export default function (WrappedComponent) {
  return class extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
    }

    componentDidMount() {
      Client.getSingle('layout')
      .then(layout => this.setState({ layout }))
      .catch(error => this.setState({ error }))
    }

    render() {
      if(!this.state.layout) return ''
      else if(this.state.error) return <NotFound />

      const headerItems = this.state.layout.data.header_nav_items.map((item, index) =>
        <a key={index} className="header-nav-link" href={Link.url(item.link, linkResolver)}>
          {item.text}
        </a>
      )

      const socialItems = this.state.layout.data.footer_social_items.map((item, index) => {
        const targetAttr = item.link.target ? `target=${item.link.target} rel="noopener"` : '';
        return (
          <a
            key={index}
            className="footer-social-item"
            href={Link.url(item.link, linkResolver)}
            {...targetAttr}
          >
            <img src={item.icon.url} alt={item.icon.alt} />
          </a>
        )
      })

      const navItems = this.state.layout.data.footer_nav_items.map((item, index) =>
        <a key={index} className="footer-nav-link" href={Link.url(item.link)}>
          {item.text}
        </a>
      )
      return (
        <React.Fragment>
          <div className="header" id="header">
            <div className="header-inner">
              <a className="header-name" href="/">
                {this.state.layout.data.site_name}
              </a>
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
            <WrappedComponent {...this.props} />
          </main>

          <footer className="footer">
            <div className="footer-inner">
              <div>
                <p className="footer-name">
                  {this.state.layout.data.site_name}
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
}