const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

let messages = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('message', () => console.log('got your message'));
});
