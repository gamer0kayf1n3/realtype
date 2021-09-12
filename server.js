const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('realtime input', msg => {
    io.emit('realtime input', msg);
    console.log(msg)
    if (msg == "!endconnection") {
		io.emit('realtime input', 'Connection has ended. Forced by user.');
		throw 'Forced by user';
    }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
