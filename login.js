var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/',function(req,res){
	res.sendFile(__dirname + '/login.html');
});

server.listen(1338);

var names = [];
var socket = sio.listen(server);
socket.on('connection',function(socket){
      socket.emit('login',names);
      socket.on('send',function(name){
         names.push(name);
         socket.emit('login',names);
      })
});