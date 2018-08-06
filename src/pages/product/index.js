import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../../components/layout/meta'
import NotFound from '../notfound'
import { Client, linkResolver } from '../../components/prismic'
import { RichText, Link as PrismicLink } from 'prismic-reactjs'

const graphQuery = `{
  product {
    ...productFields
    related_products {
      ...related_productsFields
      product1 {
        product_image
        product_name
        sub_title
      }
    }
  }
}`

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleClickAddCart = this.handleClickAddCart.bind(this)
  }

  componentDidMount() {
    const { computedMatch: { params } } = this.props;
    Client.getByUID('product', params.uid, { graphQuery })
    .then(product => {
      if(product) this.setState({ product })
      else this.setState({ error: true })
    })
    .catch(error => {
      console.error(error)
      this.setState({ error })
    })
  }

  componentDidUpdate() {
    if(this.state.product) window.prerenderReady = true
  }

  handleClickAddCart(event) {
    event.preventDefault()
    window.alert(`No. Not today.\nWe're integrating the GraphQL API at the moment, so coffee delivery is temporarily unavailable.`)
  }

  renderRelatedProducts(related) {
    return related.map((item, index) =>
      <div key={index} className="products-grid-item-wrapper">
        <img className="products-grid-item-image" src={item.product1.data.product_image.url} alt={item.product1.data.product_image.alt}/>
        <p className="products-grid-item-name">
          <Link to={PrismicLink.url(item.product1, linkResolver)}>
            {RichText.asText(item.product1.data.product_name)}
          </Link>
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
                    <Link className="a-button a-button--filled" to={PrismicLink.url(this.state.product.data.button_link, linkResolver)} onClick={this.handleClickAddCart}>
                      {RichText.asText(this.state.product.data.button_label)}
                    </Link>
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
    if(this.state.error) return <NotFound msg="this product doesn't exists." />
    else if(!this.state.product) return ''

    return (
    <React.Fragment>
      {Meta(this.state.product)}
      {this.renderBody()}
    </React.Fragment>
    )
  }
}