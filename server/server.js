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


    // Greets current user with message.
    socket.emit('newMessage', {
        from: 'Chat App Admin',
        text: 'Welcome to the discussion, please treat people with respect :)',
        createdAt: new Date().getTime()
    });

    // Broadcast sends to everyone but this socket.
    socket.broadcast.emit('newMessage', {
        from: 'New User',
        text: 'A new user has joined',
        createdAt: new Date().getTime()
    });


    // Listens for emitter on user connection.
    socket.on('createMessage', (message) => {
        console.log('Create message', message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // Broadcast sends to everyone but this socket.
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from socket.io server');
    })
});


// Server
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});