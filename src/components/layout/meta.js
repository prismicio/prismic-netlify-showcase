import React from 'react'
import {Helmet} from 'react-helmet'
import { RichText } from 'prismic-reactjs'

export default doc =>
  <Helmet>
    <title>{RichText.asText(doc.data.meta_title) || 'Disrupt Coffee'}</title>
    {doc.data.meta_description ? <meta name="description" content={doc.data.meta_description} /> : ''}
  </Helmet>