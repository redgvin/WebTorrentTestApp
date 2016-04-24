import React from 'react'
import ReactDOM from 'react-dom'

var FileName = React.createClass({

  getInitialState: function() {
    return {
      isEditing: false,
      name: 'test'
    };
  },

  edit: function () {
    this.setState({
      isEditing: true
    });
  },

  editEnd: function (e) {
    var val = ReactDOM.findDOMNode(this.refs.filename).value;
    if (e.keyCode == 13 || e.type == 'blur') {
      this.setState({
        isEditing: false,
        name: val
      });
    }
  },

  render: function() {
    let template;
    if (this.state.isEditing) {
      template = (
        <input type='text' ref='filename' defaultValue={this.state.name} onKeyDown={this.editEnd} onBlur={this.editEnd}/>
      )
    } else {
      template = (
        <div onClick={this.edit}>{this.state.name}</div>
      )
    }
    return template;
  }
});

export default FileName