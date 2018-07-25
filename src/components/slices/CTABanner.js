import React from 'react'
import { Link } from 'react-router-dom'
import { Link as PrismicLink, RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic'

export default ({ slice }) =>
  <section>
    <div className="cta-banner-inner">
      <img className="cta-banner-image" src={slice.primary.image_banner.url} alt={slice.primary.image_banner.alt} />
      <div className="cta-banner-content">
        <div className="cta-banner-box">
          <div className="cta-banner-title">
            {RichText.render(slice.primary.banner_title, linkResolver)}
          </div>
          <div className="cta-banner-text">
            {RichText.render(slice.primary.banner_text, linkResolver)}
          </div>
        </div>
        <div className="cta-banner-link-wrapper">
          <Link className="cta-banner-link" to={PrismicLink.url(slice.primary.cta_link, linkResolver)}>
            {slice.primary.cta_label}
          </Link>
        </div>
      </div>
    </div>
  </section>
