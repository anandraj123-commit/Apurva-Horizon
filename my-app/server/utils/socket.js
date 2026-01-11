let io;

module.exports = {
  // This sets up the walkie-talkie base station
  init: (server) => {
    io = require('socket.io')(server, {
      cors: { origin: '*' }
    });
    return io;
  },

  // This lets other files access the same walkie-talkie
  getIO: () => {
    if (!io) throw new Error('Socket not initialized!');
    return io;
  }
};