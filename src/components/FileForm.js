import React from 'react'
import FileName from '../components/FileName'
import FileDescription from '../components/FileDescription'

var FileForm = React.createClass({
  
  getInitialState: function() {
    return {
      dataUri: null,
      activeTab: 'load'
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
  },

  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.fileName = file.name;

    reader.onload = function(upload) {
      self.setState({
        dataUri: upload.target.result,
        name: upload.target.fileName
      });
    }

    reader.readAsDataURL(file);
  },
  tabChange: function(load) {
    let active = 'list';
    if (load) {
      active = 'load';
    }
    this.setState({
      activeTab: active
    });
  },
  render: function() {
    let loadTabStyle = {display: 'block'};
    let listTabStyle = {display: 'none'};
    if (this.state.activeTab != 'load') {
      loadTabStyle = {display: 'none'};
      listTabStyle = {display: 'block'};
    }
    return (
      <div>
        <div className='row'>
          <div className='col-md-3'>
            <button className='btn btn-primary' >File load</button>
          </div>
          <div className='col-md-3'>
            <button className='btn btn-primary' >File List</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3' style={loadTabStyle}>

            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <div className='form-group'>
                <input  type='file' onChange={this.handleFile} />
              </div>
              <div className='form-group'>
                <input className='btn btn-primary' type='submit' value='Submit' />
              </div>
              <div className='form-group'>
                <FileName name={this.state.name}/>
                <FileDescription />
              </div>
            </form>
          </div>
          <div className='col-md-3' style={listTabStyle}>

          </div>
        </div>
      </div>

    );
  }
});

export default FileForm