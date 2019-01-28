import React from 'react'
import qs from 'qs';
import { Client, linkResolver } from './index'

export default class Preview extends React.Component {

  componentDidMount(props) {
    const params = qs.parse(this.props.location.search.slice(1))
    Client.previewSession(params.token, linkResolver, '/').then((url) => {
      this.props.history.push(url)
    })
  }

  render() {
    return (
      <div className="header" id="header">
        <div className="header-inner">
          <p className="header-name">Loading preview...</p>
        </div>
      </div>
    )
  }
}