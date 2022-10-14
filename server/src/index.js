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
  socket.on('CREATE_MEETUP', (data) => {
    io.emit('SEND_NEW_MEETUP', { meetup: data.meetup });
  });
  socket.on('JOIN_LOUNGE', (data) => {
    socket.join(data.chatRoom);
    // console.log(data.chatRoom);
  });

  // 自分以外に送る。
  socket.on('I_SEND_A_CHAT_TO_MY_GROUP', (data) => {
    io.emit('PEER_SEND_A_CHAT_TO_MY_GROUP', { content: data.content });
  });
});

server.listen(3500, () => {
  console.log('listening on port 3500');
});
