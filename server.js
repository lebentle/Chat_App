var express = require('express');

// app initilizes app to be a function handler that you can supply to
// an http server
var app = express();
var prevmessages = [];

var http = require('http');
var server = http.Server(app);
var conn = 'A new user has connected.'
var dis = 'A user has disconnected.'

app.use(express.static('client'));

var io = require('socket.io')(server);



io.on('connection', function (socket) {
  io.emit('message', conn);  // show when a new user has connected 	
  for (var i = 0; i < prevmessages.length; i++){
  	socket.emit('message',prevmessages[i])
  }; 	
  socket.on('message', function (msg) {
    io.emit('message', msg);
    prevmessages.push(msg);
  });
  socket.on('disconnect', function(){
  	io.emit('message', dis);
  });
});

server.listen(8080, function() { // make ther server listen on port 8080
  console.log('Chat server running');
});
