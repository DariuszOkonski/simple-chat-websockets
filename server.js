const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

let messages = [];
let users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id - ' + socket.id);

  socket.on('join', (incomingClient) => {
    const client = { id: socket.id, name: incomingClient.author };

    users.push(client);
  });

  socket.on('message', (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    users = users.filter((user) => user.id !== socket.id);
  });

  console.log("I've added a listener on message event \n");
});
