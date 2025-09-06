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
  socket.on('join', (incomingClient) => {
    const client = { id: socket.id, name: incomingClient.author };

    users.push(client);

    const message = {
      author: 'Chat Bot',
      content: `${client.name} has joined the conversation!`,
    };

    socket.broadcast.emit('message', message);
  });

  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const clientName = users.find((user) => user.id === socket.id).name;

    const message = {
      author: 'Chat Bot',
      content: `${clientName} has left the conversation...`,
    };

    socket.broadcast.emit('message', message);
    users = users.filter((user) => user.id !== socket.id);
  });
});
