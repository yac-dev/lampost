import http from 'http';
import app from './app';
import { Server } from 'socket.io';

import Chat from './models/chat';
import Library from './models/library';
import LibraryAndUserRelationship from './models/libraryAndUserRelationship';
import Meetup from './models/meetup';
import User from './models/user';
import ChatRoom from './models/chatRoom';

import { createMeetup } from './services/socketControllers';

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
    // const {
    //   place,
    //   badges,
    //   title,
    //   startDateAndTime,
    //   duration,
    //   applicationDeadline,
    //   isMeetupAttendeesLimitFree,
    //   meetupAttendeesLimit,
    //   isMeetupFeeFree,
    //   currency,
    //   fee,
    //   description,
    //   isMeetupPublic,
    //   isMediaAllowed,
    //   launcher,
    //   link,
    // } = data;

    // const badgeIds = badges.map((badge) => badge._id);

    // const meetup = new Meetup({
    //   place,
    //   badges: badgeIds,
    //   title,
    //   startDateAndTime,
    //   duration,
    //   applicationDeadline,
    //   description,
    //   link,
    //   launcher,
    //   createdAt: new Date(),
    // });

    // if (isMeetupFeeFree) {
    //   meetup.isFeeFree = true;
    // } else {
    //   meetup.isFeeFree = false;
    //   meetup.currency = currency;
    //   meetup.fee = fee;
    // }

    // if (isMeetupAttendeesLimitFree) {
    //   meetup.isAttendeesLimitFree = true;
    // } else {
    //   meetup.isAttendeesLimitFree = false;
    //   meetup.attendeesLimit = meetupAttendeesLimit;
    // }

    // if (isMeetupPublic) {
    //   meetup.isPublic = true;
    // } else {
    //   meetup.isPublic = false;
    // }

    // if (isMediaAllowed) {
    //   meetup.isMediaAllowed = true;
    // } else {
    //   meetup.isMediaAllowed = false;
    // }

    // const user = await User.findById(launcher);
    // const pushing = {
    //   meetup: meetup._id,
    //   viewedChatsLastTime: new Date(),
    // };
    // user.upcomingMeetups.push(pushing);
    // user.save();

    // // chatroom作成。
    // const chatRoom = new ChatRoom({
    //   createdAt: new Date(),
    // });
    // chatRoom.members.push(user._id);
    // chatRoom.save();

    // meetup.attendees.push(launcher);
    // meetup.totalAttendees = 1;
    // meetup.chatRoom = chatRoom._id;
    // meetup.save();
    // // const badge = await Badge.findById(badges[0]); これ、持ってきたbadgeをそのまま送る方がいい。

    // const meetupObject = {
    //   meetup: {
    //     _id: meetup._id,
    //     place: meetup.place,
    //     title: meetup.title,
    //     startDateAndTime: meetup.startDateAndTime,
    //     badge: badges[0], // これは、そのまま送る。
    //   },
    //   viewedChatsLastTime: new Date(),
    //   launcher,
    // };
    // const obj = {
    //   launcher: data.launcher,
    //   message: 'helo',
    // };
    // io.emit('CREATED_MEETUP', obj);
  });

  socket.on('JOIN_A_LOUNGE', (data) => {
    console.log('someone joined');
    socket.join(data.chatRoom);
    // console.log(io.in(data.chatRoom).allSockets());
    socket.to(data.chatRoom).emit('SOMEONE_JOINED_TO_MY_LOUNGE', { message: 'Someone joined!' });
  });

  // libraryのcrewation
  socket.on('CREATE_LIBRARY', async (data) => {
    const badgeIds = data.badges.map((badge) => {
      return badge._id;
    });

    const library = await Library.create({
      name: data.name,
      badges: badgeIds,
      description: data.description,
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
