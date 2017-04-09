var http = require('http');
var express = require('express');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
app.get('/',function(req,res){
	res.sendFile(__dirname + '/namespace.html');
	res.setHeader('Access-Control-Allow-Origin', '*');
});

server.listen(1337);
var socket = sio.listen(server);
var chat = socket
    .of('/chat')
    .on('connection',function(socket){
    	socket.send('欢迎访问chat空间');
    	socket.on('message',function(msg){
    		console.log('chat命名空间收到消息',msg);
    	});
    });

var news = socket
     .of('/news')
     .on('connection',function(socket){
     	socket.emit('sendmessage','欢迎访问new空间');
     	socket.on('sendmessage',function(data){
     		console.log('news命令空间接收到send message事件，数据为：',data);
     	});
     });