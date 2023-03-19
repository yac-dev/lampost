import FriendChat from '../models/friendChat';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';

export const createFriendChat = async (request, response) => {
  try {
    const { sender, recieverId, content, friendChatRoomId } = request.body;
    const friendChat = await FriendChat.create({
      sender: sender._id,
      reciever: recieverId,
      content,
      friendChatRoom: friendChatRoomId,
      isRead: false,
    });
    const reciever = await User.findById(recieverId);
    const notificationMessage = {
      to: reciever.pushToken,
      data: { notificationType: 'friendChat' },
      title: `${sender.name} sent you a message.`,
      body: content,
    };
    sendPushNotification(reciever.pushToken, notificationMessage);
    response.status(201).json({
      chat: {
        user: sender.name,
        photo: sender.photo,
        content: sender.content,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFriendChatsByFriendChatRoomId = async (request, response) => {
  try {
    const friendChats = await FriendChat.find({ friendChatRoom: request.params.friendChatRoomId });
    response.status(201).json({
      friendChats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUnreadChatFriendChats = async (request, response) => {};
