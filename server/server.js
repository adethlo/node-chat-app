// Load required libraries
const express = require('express');
const path = require('path');
// Load libraries for socket.io
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

let app = express();
// Important for socket.io
let server = http.createServer(app); 
let io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Greeting to newly joined user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => { // Use server instead of app for socket.io to work
    console.log(`Server is listening to port ${port}`);
});