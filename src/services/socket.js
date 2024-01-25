// socket.js
const socketIO = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIO(server);
    return io;
}

const getIO = () => {
    if (!io) {
        throw new Error('IO not initialized');
    }
    return io;
};

module.exports = {
    initSocket,
    getIO
};

