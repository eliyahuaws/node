var app = require('http').createServer(handler) 
var io = require('socket.io')(app);

var fs = require('fs'); //We need fs to call index.html
var port = process.env.PORT || 3000;

app.listen(port); 

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    socket.emit('news', { hello: 'world' });
  });

  socket.on('another-message', function (data) {
    socket.emit('not-news', { hello: 'world' });
  });
});