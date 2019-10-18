let sockets = {};

sockets.init = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log('окет установлен');

    socket.on('send', text => {
      const arr = text.split(' ');

      let result = arr.reduce((result, cur) => {
          result[cur] = result[cur] + 1 || 1;
          return result
        }, {}
      );

      let array = Object.entries(result);

      const endgame = array.sort((a, b) => {
        if (a[1] > b[1]) return -1;
        if (a[1] == b[1]) return 0;
        if (a[1] < b[1]) return 1;
      });

      io.to(socket.id).emit('result', endgame)
    })
  })
};

module.exports = sockets;