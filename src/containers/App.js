import React, { Component } from 'react'
import FileForm from '../components/FileForm'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1>WebTorrent Test App</h1>
        <FileForm />
      </div>
    )
  }
}
