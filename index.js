// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});


const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
    console.log('A user connected' + socket.id);
    socket.on(("message"), ({ check, playerId }) => {
        console.log(check);
        io.to(playerId).emit("recieved-message", check);
    })
});

server.listen(PORT, () => {
    console.log(`Server running`);
});
