import React from 'react'
import NotFound from '../notfound'
import { Client, linkResolver } from '../../components/prismic'
import Meta from '../../components/layout/meta'
import { RichText } from 'prismic-reactjs'
import { CTABanner, FeaturedItems, NumerotedItems, Separator, TextBlock } from '../../components/slices'

const graphQuery = `
{
  homepage {
    body {
      ... on featured_items {
        repeat {
          link_to_product {
            ... on Product {
              product_image
              product_name
              sub_title
            }
          }
        }
      }
    }
  }
}
`

const fetchLinks = [
  'product.product_image',
  'product.product_name',
  'product.sub_title'
]

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Client.getSingle('homepage', {fetchLinks})
    .then(home => this.setState({ home }))
    .catch(error => {
      console.error(error)
      this.setState({ error })
    })
  }

  renderSlices(slices) {
    return slices.map((slice, index) => {
      const res = (() => {
        switch(slice.slice_type) {
          case 'cta_banner': return (
            <div key={index} className="homepage-slice-wrapper">
              <CTABanner slice={slice} />
            </div>
          )

          case 'featured_items': return (
            <div key={index} className="homepage-slice-wrapper">
              <FeaturedItems slice={slice} />
            </div>
          )

          case 'big_bullet_item': return (
            <div key={index} className="homepage-slice-wrapper">
              <NumerotedItems slice={slice} />
            </div>
          )

          case 'separator': return (
            <div key={index} className="homepage-slice-wrapper">
              <Separator />
            </div>
          )

          case 'text_block': return (
            <div key={index} className="homepage-slice-wrapper">
              <TextBlock slice={slice} />
            </div>
          )

          default: return
        }
      })();
      return res;
    })
  }

  renderBody() {
    return (
      <React.Fragment>
        <header className="homepage-header">
          <div className="l-wrapper">
            <div className="homepage-header-title">
              {RichText.render(this.state.home.data.title, linkResolver)}
            </div>
          </div>
        </header>

        <section className="homepage-banner">
          <img className="homepage-banner-image" src={this.state.home.data.banner_image.url} alt={this.state.home.data.banner_image.alt} />
          <div className="homepage-banner-box-wrapper">
            <div className="homepage-banner-box">
            {RichText.render(this.state.home.data.banner_text, linkResolver)}
            </div>
          </div>
        </section>

        <div className="homepage-slices-wrapper">
          {this.renderSlices(this.state.home.data.body)}
        </div>

        <div data-wio-id={this.state.home.data.id}></div>
      </React.Fragment>
    )
  }

  render() {
    if(!this.state.home) return ''
    else if(this.state.error) return <NotFound />

    return (
    <React.Fragment>
      {Meta(this.state.home)}
      {this.renderBody()}
    </React.Fragment>
    )
  }
}