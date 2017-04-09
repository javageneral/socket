var http  =require('http');
var sio = require('socket.io');
var fs = require('fs');

var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(fs.readFileSync('./index1.html'));
});

server.listen(1337);

var socket = sio.listen(server);
socket.on('connection',function(socket){
     console.log('客户端建立连接');
     socket.send('你好');
     socket.on('message',function(msg){
     	console.log('接收到客户端一个信息: ' , msg);
     });
     socket.on('disconnect',function(){
     	console.log('客户端断开连接');
     });
});