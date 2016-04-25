import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'

var Socketiop2p = require('socket.io-p2p');
var io = require('socket.io-client')
var sha1 = require('sha1');

function init () {
  var socket = io()
  var opts = {peerOpts: {trickle: false}}
  var p2psocket = new Socketiop2p(socket, opts, function () {
    console.log('p2psocket');
    p2psocket.emit('peer-obj', 'Hello there. I am ' + p2psocket.peerId)
    onHashChange()
  })

  // Elements
  var form = document.getElementById('msg-form')
  var boxFile = document.getElementById('msg-file')
  var msgList = document.getElementById('msg-list')
  var hashList = document.getElementById('hashlist')

  p2psocket.on('peer-msg', function (data) {
    console.log('peer-msg')
    var li = document.createElement('li')
    li.appendChild(document.createTextNode(data.textVal))
    msgList.appendChild(li)
  })

  p2psocket.on('peer-file', function (data) {
    console.log('peer-file')
    var localHash = decodeURIComponent(window.location.hash.substring(1)).trim();
    if (localHash == data.hash){
      var li = document.createElement('li')
      var fileBytes = new window.Uint8Array(data.file)
      var blob = new window.Blob([fileBytes], {type: 'image/jpeg'})

      var reader = new window.FileReader()
      reader.onprogress = function (evnt) {
        console.log(evnt)
      }
      reader.onerror = function (err) {
        console.error('Error while reading file', err)
      }
      reader.readAsArrayBuffer(blob)

      var urlCreator = window.URL || window.webkitURL
      var fileUrl = urlCreator.createObjectURL(blob)
      var a = document.createElement('a')
      var linkText = document.createTextNode('New file')
      a.href = fileUrl
      a.appendChild(linkText)
      li.appendChild(a)
      msgList.appendChild(li)
    }
  })
  var filesList = [];
  p2psocket.on('get-peer-file', function (data) {
    console.log('get-peer-file')
    p2psocket.emit('peer-file', {file: filesList[data.hash], hash: data.hash})
  })
  p2psocket.on('peer-file-info', function (data) {
    var li = document.createElement('li')
    var a = document.createElement('a')
    var text = document.createTextNode(data.hash);
    a.href = '/#' + data.hash;
    hashList.appendChild(li).appendChild(a).appendChild(text)
    
  })
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (boxFile.value !== '') {
      var reader = new window.FileReader()
      reader.onload = function (evnt) {
        var fileBytes = new window.Uint8Array(evnt.target.result)
        var blob = new window.Blob([fileBytes], {type: 'image/jpeg'})
        var urlCreator = window.URL || window.webkitURL
        var fileUrl = urlCreator.createObjectURL(blob)
        var hash = sha1(fileUrl)
        filesList[hash] = evnt.target.result;
        console.log(hash);
        p2psocket.emit('peer-file-info', {hash, url: fileUrl})
      }
      reader.onerror = function (err) {
        console.error('Error while reading file', err)
      }
      reader.readAsArrayBuffer(boxFile.files[0])
    }
  })

  // Download by URL hash
  window.addEventListener('hashchange', onHashChange)
  function onHashChange () {
    var hash = decodeURIComponent(window.location.hash.substring(1)).trim()
    if (hash !== '') {
      p2psocket.emit('get-peer-file', {hash: hash})
    }
  }
}

document.addEventListener('DOMContentLoaded', init, false)

render(
  <App />,
  document.getElementById('root')
)
