import { Server } from 'socket.io';
import server from '../index';

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
  });

  socket.on('I_SEND_A_CHAT_TO_MY_GROUP', (data) => {
    socket.to(data.chatRoom).emit('A_PEER_SEND_A_CHAT_TO_MY_GROUP', { chat: data.chat });
  });
});

export default io;
