import Prismic, { previewCookie } from 'prismic-javascript'
import PrismicConfig from './prismic-configuration.json'

const _options = Object.assign({}, PrismicConfig.accessToken ? {accessToken: PrismicConfig.accessToken} : {})
export const client = Prismic.client(PrismicConfig.apiEndpoint, _options)

export const PREVIEW_COOKIE = previewCookie

export const linkResolver = doc => {
  if (doc.type === 'product') return '/product/' + doc.uid
  return '/'
}
