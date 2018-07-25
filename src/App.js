import React from 'react'
import Router from './Routes'
import { Client } from './components/prismic'

import './assets/stylesheets/main.css'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    Client.getSingle('layout')
      .then(layout => this.setState({ layout }))
      .catch(error => this.setState({ error }))
  }

  render() {
    if(!this.state.layout) return ''
    else return <Router layout={this.state.layout} />
  }
}
