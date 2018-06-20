require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

// Renders public directory.
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Andrew',
        text: 'Do you understand this yet?',
        createdAt: Date.now()
    });

    // Listens for emitter on user connection.
    socket.on('createMessage', (message) => {
        console.log('Create message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from socket.io server');
    })
});


// Server
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});