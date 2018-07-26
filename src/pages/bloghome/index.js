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
    const bloghomeF = Client.getSingle('blog_home');
    const postsF = Client.query(Prismic.Predicates.at('document.type', 'blog_post'), { pageSize: 50 });

    Promise.all([bloghomeF, postsF])
    .then(([bloghome, posts]) =>
      this.setState({ bloghome, posts: posts.results })
    )
    .catch(error => {
      console.error(error)
      this.setState({ error })
    })
  }

  componentDidUpdate() {
    if(this.state.bloghome) window.prerenderReady = true
  }

  renderPosts() {
    return this.state.posts.map((document, index) =>
      <div key={index} className="blog-home-post-wrapper">
        <article>
          <img className="blog-home-post-image" src={document.data.image.url} alt={document.data.image.alt} />
          <p className="blog-home-post-title">
            {RichText.asText(document.data.title)}
          </p>
          <p className="blog-home-post-excerpt">
            {RichText.asText(document.data.rich_content).substring(0, 158)} …
          </p>
          <div className="blog-home-post-button-wrapper">
            <Link className="a-button" to={linkResolver(document)}>
              Read post
            </Link>
          </div>
        </article>
      </div>
    )
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="blog-home-section">
          <div className="blog-home-posts-wrapper">
            {this.renderPosts()}
          </div>
        </section>

        <div data-wio-id={this.state.bloghome.id}></div>
      </React.Fragment>
    )
  }

  render() {
    if(this.state.error) return <NotFound />
    else if(!this.state.bloghome) return ''

    return (
    <React.Fragment>
      {Meta(this.state.bloghome)}
      {this.renderBody()}
    </React.Fragment>
    )
  }
}