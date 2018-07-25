import PrismicLib, { previewCookie } from 'prismic-javascript'
import PrismicConfig from './prismic-configuration.json'

const _options = Object.assign({}, PrismicConfig.accessToken ? {accessToken: PrismicConfig.accessToken} : {})
export const Client = PrismicLib.client(PrismicConfig.endpoint, _options)
export const Prismic = PrismicLib
export const PREVIEW_COOKIE = previewCookie

export const linkResolver = doc => {
  if (doc.type === 'homepage') {
    return '/';
  }
  if (doc.type === 'products') {
    return '/products';
  }
  if (doc.type === 'product') {
    return '/products/' + doc.uid;
  }
  if (doc.type === 'blog_home') {
    return '/blog';
  }
  if (doc.type === 'blog_post') {
    return '/blog/' + doc.uid;
  }
  return '/';
}
