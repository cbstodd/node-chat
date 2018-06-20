const socket = io();

socket.on('connect', () => {
    console.log('Connected to server via socket.io');

});

socket.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
});


socket.on('newMessage', (message) => {
    console.log('New Message', message);
});
