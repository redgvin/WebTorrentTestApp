import React from 'react'

var FileForm = React.createClass({
  
  getInitialState: function() {
    return {
      data_uri: null
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
  },

  handleFile: function(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result
      });
    }

    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
        <input type='file' onChange={this.handleFile} />
      </form>
    );
  }
});

export default FileForm