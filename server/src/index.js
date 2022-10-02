import http from 'http';
import app from './app';

const server = http.createServer(app);
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/mysocket',
});

io.on('connection', (socket) => {
  socket.emit('GET_SOCKET_ID', socket.id);
  socket.on('CREATE_MEETUP', (data) => {
    io.emit('SEND_NEW_MEETUP', { meetup: data.meetup });
  });
});

server.listen(3500, () => {
  console.log('listening on port 3500');
});
