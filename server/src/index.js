import http from 'http';
import app from './app';
import { Server } from 'socket.io';

import Chat from './models/chat';
import Library from './models/library';
import LibraryAndUserRelationship from './models/libraryAndUserRelationship';
import Roll from './models/roll';

const server = http.createServer(app);

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
  socket.on('JOIN_A_LOUNGE', (data) => {
    console.log('someone joined');
    socket.join(data.chatRoom);
    // console.log(io.in(data.chatRoom).allSockets());
    socket.to(data.chatRoom).emit('SOMEONE_JOINED_TO_MY_LOUNGE', { message: 'Someone joined!' });
  });

  socket.on('CREATE_LIBRARY', async (data) => {
    const badgeIds = data.badges.map((badge) => {
      return badge._id;
    });
    const rollObjects = data.rolls.map((roll) => {
      return {
        name: roll,
        createdAt: new Date(),
      };
    });
    const rolls = await Roll.insertMany(rollObjects);
    const rollIds = rolls.map((roll) => {
      return roll._id;
    });

    const library = await Library.create({
      name: data.name,
      badges: badgeIds,
      description: data.description,
      rolls: rollIds,
      launcher: data.launcher._id,
      createdAt: new Date(),
      totalMembers: 1,
      rate: 5.0,
    });
    await LibraryAndUserRelationship.create({
      library: library._id,
      user: library.launcher,
    });

    const sendingData = {
      _id: library._id,
      name: library.name,
      badges: data.badges, // これだけは送られたbadgeをそのまま送る。idでの再queryがいちいいちめんどい。
      description: library.description,
      rolls: rolls, // これは作ったrollをここに。
      launcher: data.launcher, // これも元のdataをそのままで。
      createdAt: library.createdAt,
      totalMembers: 1,
      rate: 5.0,
      createdAt: library,
    };
    io.emit('CREATED_LIBRARY', sendingData);
  });

  socket.on('I_SEND_A_CHAT_TO_MY_GROUP', async (data) => {
    // data {text: 'hello', chatRoomId: '111111', type: 'general', userId: '222222'}
    // const chat = await Chat.create({
    //   chatRoom: data.chatRoomId,
    //   content: data.text,
    //   user: data.userId,
    //   type: data.type,
    // });
    const chat = {
      chatRoom: data.chatRoomId,
      content: data.text,
      user: data.userId,
      type: data.type,
    };
    console.log('someone sent a chat!');
    io.in(chat.chatRoom).emit('SOMEONE_SENT_A_CHAT_TO_MY_GROUP', { chat });
  });
});

server.listen(3500, () => {
  console.log('listening on port 3500');
});

export default io;
