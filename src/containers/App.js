import React, { Component } from 'react'
import FileForm from '../components/FileForm'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>WebTorrent Test App</h1>
        <FileForm />
        <ul id='msg-list'></ul>
      </div>
    )
  }
}
