import Chat from '../models/chat';

export const createChat = async (request, response) => {
  // ここpush notification
  try {
    const { chatRoomId, userId, content, type } = request.body;
    const chat = await Chat.create({
      chatRoom: chatRoomId,
      user: userId,
      content,
      type,
      createdAt: new Date(),
    });

    response.status(201).json({
      chat,
    });
  } catch (error) {
    console.log(error);
  }
};

export const replyChat = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
