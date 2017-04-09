var http = require('http');
var express = require('express');
var sio = require('socket.io');
var app = express();
var server = http.createServer(app);

app.get('/',function(req,res){
	res.sendFile(__dirname + '/express.html');
});

server.listen(1337);

var socket = sio.listen(server);
socket.on('connection',function(socket){
	socket.emit('news',{hello:'你好'});
	socket.on('my other event',function(data){
		console.log('服务器接收到数据:%j',data.my);
	});
});