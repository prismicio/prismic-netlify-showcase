import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../../components/layout/meta'
import NotFound from '../notfound'
import { Client, Prismic, linkResolver } from '../../components/prismic'
import { RichText } from 'prismic-reactjs'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const queryProductsDocument = Client.getSingle('products');
    const queryProductList = Client.query(Prismic.Predicates.at('document.type', 'product'), { pageSize: 50 });

    Promise.all([queryProductsDocument, queryProductList])
    .then(([productsDocument, productListResponse]) =>
      this.setState({productsDocument, productList: productListResponse.results})
    )
    .catch(error => {
      // console.error(error)
      this.setState({ error })
    })
  }

  componentDidUpdate() {
    if(this.state.productsDocument) window.prerenderReady = true
  }

  renderProductList() {
    return this.state.productList.map((document, index) =>
      <div key={index} className="products-grid-item-wrapper">
        <Link to={linkResolver(document)}>
          <img className="products-grid-item-image" src={document.data.product_image.url} alt={document.data.product_image.alt}/>
          <p className="products-grid-item-name">
              {RichText.asText(document.data.product_name)}
          </p>
        </Link>
        <p className="products-grid-item-subtitle">{RichText.asText(document.data.sub_title)}</p>
      </div>
    )
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="products-section">
          <div className="l-wrapper">
            <header className="products-grid-header">
              <div className="products-grid-header-title">
                {RichText.render(this.state.productsDocument.data.title, linkResolver)}
              </div>
            </header>
          </div>
          <div className="products-grid-items-wrapper">
            {this.renderProductList()}
          </div>
        </section>

        <div data-wio-id={this.state.productsDocument.id}></div>
      </React.Fragment>
    )
  }

  render() {
    if(this.state.error) return <NotFound />
    else if(!this.state.productsDocument) return ''

    return (
    <React.Fragment>
      {Meta(this.state.productsDocument)}
      {this.renderBody()}
    </React.Fragment>
    )
  }
}