import FriendChat from '../models/friendChat';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';

export const createFriendChat = async (request, response) => {
  try {
    const { sender, recieverId, content, friendChatRoomId, type } = request.body;
    const friendChat = await FriendChat.create({
      sender: sender._id,
      reciever: recieverId,
      content,
      type,
      friendChatRoom: friendChatRoomId,
      isRead: false,
      createdAt: Date.now(),
    });
    const reciever = await User.findById(recieverId);
    const notificationMessage = {
      to: reciever.pushToken,
      data: {
        notificationType: 'friendChat',
        sender,
        chat: {
          _id: friendChat._id,
          content: friendChat.content,
          createdAt: friendChat.createdAt,
          type: friendChat.type,
        },
        friendChatRoomId: friendChat.friendChatRoom,
      },
      title: `${sender.name} sent you a message.`,
      body: content,
    };
    sendPushNotification(reciever.pushToken, notificationMessage);
    response.status(201).json({
      chat: {
        user: {
          _id: sender._id,
          name: sender.name,
          photo: sender.photo,
        },
        content: friendChat.content,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFriendChatsByFriendChatRoomId = async (request, response) => {
  try {
    const friendChats = await FriendChat.find({ friendChatRoom: request.params.friendChatRoomId }).populate({
      path: 'sender',
      select: 'name photo',
    });
    response.status(201).json({
      friendChats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUnreadFriendChats = async (request, response) => {
  try {
    const friendChats = await FriendChat.find({ reciever: request.params.recieverId, isRead: false }).populate({
      path: 'sender',
      select: 'name photo',
    });
    console.log(friendChats);
    const unreadFriendChatsTable = {};
    friendChats.forEach((friendChat) => {
      if (unreadFriendChatsTable[friendChat.sender._id]) {
        unreadFriendChatsTable[friendChat.sender._id]['chats'].push({
          _id: friendChat._id,
          content: friendChat.content,
          createdAt: friendChat.createdAt,
          type: friendChat.type,
        });
      } else {
        const obj = {
          friend: friendChat.sender,
          chats: [
            {
              _id: friendChat._id,
              content: friendChat.content,
              createdAt: friendChat.createdAt,
              type: friendChat.type,
            },
          ],
          friendChatRoomId: friendChat.friendChatRoom,
        };
        unreadFriendChatsTable[friendChat.sender._id] = obj;
      }
    });

    // ここでtableをつくるか。まあでもまずはgetするだけでいい。
    response.status(200).json({
      unreadFriendChatsTable,
      totalUnreads: friendChats.length,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUnreadToRead = async (request, response) => {
  try {
    const { chatIds } = request.body;
    console.log(chatIds);
    const friendChats = await FriendChat.updateMany({ _id: { $in: chatIds } }, { $set: { isRead: true } });
    response.status(200).json({
      friendChats,
    });
  } catch (error) {
    console.log(error);
  }
};
