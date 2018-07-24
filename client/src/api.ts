import io from 'socket.io-client';

const socket = io('http://localhost:8000');
const socket2 = io('http://localhost:8000');

export const getTickerPrices = cb => {
  socket.emit('getTickerPrices', 1000);
  socket.on('connectionReceived', data => {
    return cb(null, data);
  });
};

export const getIntervalPrices = cb => {
  socket2.emit('getIntervalPrices', 60000);
  socket2.on('intervalConnectionReceived', data => {
    return cb(null, data);
  });
};
