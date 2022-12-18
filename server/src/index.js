import http from 'http';
import app from './app';
import { Server } from 'socket.io';

import Chat from './models/loungeChat';
import Library from './models/library';
import LibraryAndUserRelationship from './models/libraryAndUserRelationship';
import Meetup from './models/meetup';
import User from './models/user';
import ChatRoom from './models/chatRoom';

import { createMeetup, createLoungeChat } from './services/socketControllers';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/mysocket',
});

io.on('connection', (socket) => {
  socket.on('CREATE_MEETUP', async (data) => {
    createMeetup(io, data);
  });

  // libraryのcrewation
  // socket.on('CREATE_LIBRARY', async (data) => {
  //   const badgeIds = data.badges.map((badge) => {
  //     return badge._id;
  //   });

  //   const library = await Library.create({
  //     name: data.name,
  //     badges: badgeIds,
  //     description: data.description,
  //     launcher: data.launcher._id,
  //     createdAt: new Date(),
  //     totalMembers: 1,
  //     rate: 5.0,
  //   });
  //   await LibraryAndUserRelationship.create({
  //     library: library._id,
  //     user: library.launcher,
  //   });

  //   const sendingData = {
  //     _id: library._id,
  //     name: library.name,
  //     badges: data.badges, // これだけは送られたbadgeをそのまま送る。idでの再queryがいちいいちめんどい。
  //     description: library.description,
  //     launcher: data.launcher, // これも元のdataをそのままで。
  //     createdAt: library.createdAt,
  //     totalMembers: 1,
  //     rate: 5.0,
  //     createdAt: library,
  //   };
  //   io.emit('CREATED_LIBRARY', sendingData);
  // });

  socket.on('JOIN_A_LOUNGE', (data) => {
    console.log('someone joined');
    socket.join(data.chatRoom);
    socket.to(data.chatRoom).emit('SOMEONE_JOINED_TO_MY_LOUNGE', { message: 'Someone joined!' });
  });

  socket.on('I_SEND_A_CHAT_TO_MY_GROUP', (data) => {
    createLoungeChat(io, data);
  });
});

server.listen(3500, () => {
  console.log('listening on port 3500');
});
