import Library from '../models/library';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';
import LoungeChatAndChatRoomRelationship from '../models/loungeCharAndChatRoomRelationship';
import LoungeChat from '../models/loungeChat';
import ChatRoom from '../models/chatRoom';

export const createMeetup = async (io, data) => {
  const {
    place,
    badges,
    title,
    startDateAndTime,
    duration,
    applicationDeadline,
    isMeetupAttendeesLimitFree,
    meetupAttendeesLimit,
    isMeetupFeeFree,
    currency,
    fee,
    description,
    isMeetupPublic,
    isMediaAllowed,
    launcher,
    link,
  } = data;

  const badgeIds = badges.map((badge) => badge._id);

  const meetup = new Meetup({
    place,
    badges: badgeIds,
    title,
    startDateAndTime,
    duration,
    applicationDeadline,
    description,
    link,
    launcher,
    createdAt: new Date(),
  });

  if (isMeetupFeeFree) {
    meetup.isFeeFree = true;
  } else {
    meetup.isFeeFree = false;
    meetup.currency = currency;
    meetup.fee = fee;
  }

  if (isMeetupAttendeesLimitFree) {
    meetup.isAttendeesLimitFree = true;
  } else {
    meetup.isAttendeesLimitFree = false;
    meetup.attendeesLimit = meetupAttendeesLimit;
  }

  if (isMeetupPublic) {
    meetup.isPublic = true;
  } else {
    meetup.isPublic = false;
  }

  if (isMediaAllowed) {
    meetup.isMediaAllowed = true;
  } else {
    meetup.isMediaAllowed = false;
  }

  const user = await User.findById(launcher);
  const pushing = {
    meetup: meetup._id,
    viewedChatsLastTime: new Date(),
  };
  user.upcomingMeetups.push(pushing);
  user.save();

  // chatroom作成。
  const chatRoom = new ChatRoom({
    createdAt: new Date(),
  });
  chatRoom.members.push(user._id);
  chatRoom.save();

  meetup.attendees.push(launcher);
  meetup.totalAttendees = 1;
  meetup.chatRoom = chatRoom._id;
  meetup.save();
  // const badge = await Badge.findById(badges[0]); これ、持ってきたbadgeをそのまま送る方がいい。

  const meetupObject = {
    meetup: {
      _id: meetup._id,
      place: meetup.place,
      title: meetup.title,
      startDateAndTime: meetup.startDateAndTime,
      badge: badges[0], // これは、そのまま送る。
    },
    viewedChatsLastTime: new Date(),
    launcher,
  };
  io.emit('CREATED_MEETUP', meetupObject);
};

export const createLoungeChat = async (io, data) => {
  const loungeChat = await LoungeChat.create({
    chatRoom: data.chatRoomId,
    user: data.user._id,
    content: data.content,
    type: data.type,
    createdAt: new Date(),
  });

  await LoungeChatAndChatRoomRelationship.create({
    loungeChat: loungeChat._id,
    chatRoom: loungeChat.chatRoom,
  });

  const loungeChatObject = {
    user: {
      name: data.user.name,
      photo: data.user.photo,
    },
    content: loungeChat.content,
    type: loungeChat.type,
    createdAt: loungeChat.createdAt,
  };

  io.in(data.chatRoomId).emit('SOMEONE_SENT_A_CHAT_TO_MY_GROUP', loungeChatObject);
};
