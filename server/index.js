var express = require('express');
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, "../public")));

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Listening...");
});

io.on('connection', function (socket) {
  console.log("Connected");

  socket.on('news', function (data) {
    socket.emit('news', { hello: 'world' });
    console.log(data);
  });

});