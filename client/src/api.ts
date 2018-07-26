import io from 'socket.io-client';

const socket = io('http://localhost:8000');
const socket2 = io('http://localhost:8000');

export const getTickerPrices = cb => {
  socket.open();
  socket.emit('getTickerPrices', 1000);
  socket.on('connectionReceived', data => {
    return cb(null, data);
  });
};

export const getIntervalPrices = cb => {
  socket2.open();
  socket2.emit('getIntervalPrices', 6000);
  socket2.on('intervalConnectionReceived', data => {
    return cb(null, data);
  });
};

export const closeSocket1 = () => {
  socket.close();
};

export const closeSocket2 = () => {
  socket2.close();
};
