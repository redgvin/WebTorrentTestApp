import React from 'react'
import ReactDOM from 'react-dom'

var FileField = React.createClass({

  getInitialState: function() {
    return {
      isEditing: true,
      name: ''
    };
  },
  edit: function () {
    this.setState({
      isEditing: true
    });
  },

  editEnd: function (e) {
    let val = '';
    if (this.refs.filedescription) {
      val = ReactDOM.findDOMNode(this.refs.filedescription).value;
    } else if (this.refs.filename) {
      val = ReactDOM.findDOMNode(this.refs.filename).value;
    }

    if ((e.keyCode == 13 || e.type == 'blur') && val) {
      this.setState({
        isEditing: false,
        name: val
      });
    }
  },

  render: function() {
    let template;
    if (this.state.isEditing) {
      if (this.props.isTextarea) {
        template = (
          <textarea ref='filedescription' defaultValue={this.state.name} onKeyDown={this.editEnd} onBlur={this.editEnd}/>
        )
      } else {
        template = (
          <input type='text' ref='filename' defaultValue={this.state.name} onKeyDown={this.editEnd} onBlur={this.editEnd}/>
        )
      }
    } else {
      template = (
        <div onClick={this.edit}>
          <span style={{padding: '15px'}}>{this.state.name}</span>
          <span className='glyphicon glyphicon-pencil'></span>
        </div>
      )
    }
    return template;
  }
});

export default FileField