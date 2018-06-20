const socket = io();

socket.on('connect', () => {
    console.log('Connected to server via socket.io');

    // Emits/calls the message when triggered
    socket.emit('createMessage', {
        from: 'colper',
        text: 'Word up dude, why dont you pick up your phone?',
    })
});

socket.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
});


socket.on('newMessage', (message) => {
    console.log('New Message', message);
});
