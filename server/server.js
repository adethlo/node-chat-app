// Load required libraries
const express = require('express');
const path = require('path');
// Load libraries for socket.io
const http = require('http');
const socketIO = require('socket.io');

let app = express();
// Important for socket.io
let server = http.createServer(app); 
let io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => { // Use server instead of app for socket.io to work
    console.log(`Server is listening to port ${port}`);
});