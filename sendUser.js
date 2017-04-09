var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/',function(req,res){
	res.sendFile(__dirname + '/sendUser.html');
});

server.listen(1338);

//var num  = 0;
//var username = [];
var nickname = [];
var socket = sio.listen(server);
socket.on('connection',function(socket){
	socket.on('setnickname',function(name){
			socket.emit('sendnickname',name);
			nickname.push(name);
	});
	socket.on('getnickname',function(err,nickname){
             if (err) {
             	socket.emit('err',err.message);
             }else{
             	socket.emit('sendnickname',nickname);
             }
	});
});