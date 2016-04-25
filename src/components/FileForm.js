import React from 'react'
import FileField from '../components/FileField'
import filesize from 'filesize'

var FileForm = React.createClass({

  getInitialState: function () {
    return {
      dataUri: null,
      isAddForm: true,
      name: ''
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
  },
  fileNameChange: function (name) {
    this.setState({
      name: name
    });
  },
  handleFile: function (e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.fileName = file.name;
    reader.fileSize = filesize(file.size);
    reader.onload = function (upload) {
      console.log(upload.target.fileSize)
      self.setState({
        dataUri: upload.target.result,
        name: upload.target.fileName,
        size: upload.target.fileSize
      });
    }

    reader.readAsDataURL(file);
  },
  tabChange: function (load) {
    this.setState({
      isAddForm: load
    });
  },
  render: function () {
    let info = this.state.name + ',  ' + this.state.size;
    return (
      <div>
        <div className='row'>
          <ul className='nav nav-tabs' role='tablist'>
            <li className={this.state.isAddForm?'active':''} onClick={this.tabChange.bind(this, true)}><a href='#'>File
              load</a></li>
            <li className={!this.state.isAddForm?'active':''} onClick={this.tabChange.bind(this, false)}><a href='#'>File
              List</a></li>
          </ul>
        </div>
        <div className='row' style={{paddingTop: '50px'}}>
          <div className='col-md-6' style={this.state.isAddForm?{display: 'block'}:{display: 'none'}}>
            <form onSubmit={this.handleSubmit} encType='multipart/form-data' id='msg-form'>
              <div className='form-group'>
                <input type='file' id='msg-file' onChange={this.handleFile}/>
              </div>
              <div className='form-group'>
                <input className='btn btn-primary' type='submit' value='Submit'/>
              </div>
            </form>
            <div className='form-horizontal' style={this.state.name?{display: 'block'}:{display: 'none'}}>
              <div className='form-group'>
                <h3>Информация о файле:</h3> {info}
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'>Введите название:</label>
                <div className='col-sm-8'>
                  <FileField isTextarea={false}/>
                </div>
              </div>
              <div className='form-group'>
                <label for='inputEmail3' className='col-sm-4 control-label'>Введите описание</label>
                <div className='col-sm-8'>
                  <FileField isTextarea={true}/>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <ul id='hashlist'>
              
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default FileForm