import React from 'react'
import Meta from '../../components/layout/meta'
import Layout from '../../components/layout'
import NotFound from '../notfound'
import { Client, linkResolver } from '../../components/prismic'
import { RichText, Link } from 'prismic-reactjs'

const fetchLinks = [
  'product.product_image',
  'product.product_name',
  'product.sub_title'
]

const graphQuery = `{
  product {
    related_products {
      product1 {
        product_image
        product_name
        sub_title
      }
    }
  }
}`

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Client.getByUID('product', this.props.match.params.uid, { fetchLinks })
    .then(product => this.setState({ product }))
    .catch(error => {
      console.error(error)
      this.setState({ error })
    })
  }

  renderRelatedProducts(related) {
    return related.map((item, index) =>
      <div key={index} className="products-grid-item-wrapper">
        <img className="products-grid-item-image" src={item.product1.data.product_image.url} alt={item.product1.data.product_image.alt}/>
        <p className="products-grid-item-name">
          <a href={Link.url(item.product1, linkResolver)}>
            {RichText.asText(item.product1.data.product_name)}
          </a>
        </p>
        <p className="products-grid-item-subtitle">{RichText.asText(item.product1.data.sub_title)}</p>
      </div>
    )
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <div className="product-sections-wrapper">

          <section>
            <div className="l-wrapper">
              <div className="product-hero-inner">
                <img className="product-hero-image" src={this.state.product.data.product_image.url} alt={this.state.product.data.product_image.alt} />
                <div className="product-hero-content">
                  <div className="product-hero-name">
                    {RichText.render(this.state.product.data.product_name, linkResolver)}
                  </div>
                  <div className="product-hero-rich-content">
                    {RichText.render(this.state.product.data.rich_content, linkResolver)}
                  </div>
                  <div className="product-hero-button-wrapper">
                    <a className="a-button a-button--filled" href={Link.url(this.state.product.data.button_link, linkResolver)}>
                      {RichText.asText(this.state.product.data.button_label)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="product-description">
            <div className="l-wrapper">
              <div className="product-description-title">
                {RichText.render(this.state.product.data.title, linkResolver)}
              </div>
              <div className="product-description-content">
                {RichText.render(this.state.product.data.product_description, linkResolver)}
              </div>
            </div>
          </section>

          <div className="product-separator-wrapper">
            <div className="l-wrapper">
              <hr className="separator-hr" />
            </div>
          </div>

          <section>
            <div className="l-wrapper">
              <header className="products-grid-header">
                <div className="products-grid-header-title">
                  {RichText.render(this.state.product.data.related_products_title, linkResolver)}
                </div>
              </header>
            </div>
            <div className="products-grid-items-wrapper">
              {this.renderRelatedProducts(this.state.product.data.related_products)}
            </div>
          </section>

        </div>

        <div data-wio-id={document.id}></div>
      </React.Fragment>
    )
  }

  render() {
    if(!this.state.product) return ''
    else if(this.state.error) return <NotFound />

    return (
    <React.Fragment>
      {Meta(this.state.product)}
      {this.renderBody()}
    </React.Fragment>
    )
  }
}

export default Layout(Product)