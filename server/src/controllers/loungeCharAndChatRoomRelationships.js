import LoungeChatAndChatRoomRelationship from '../models/loungeCharAndChatRoomRelationship';

export const getChatsByChatRoomId = async (request, response) => {
  try {
    const loungeChatAndChatRoomRelationships = await LoungeChatAndChatRoomRelationship.find({
      chatRoom: request.params.chatRoomId,
    }).populate({ path: 'loungeChat' });

    const chats = loungeChatAndChatRoomRelationships.map((relationship) => relationship.loungeChat);
    response.status(200).json({
      chats,
    });
  } catch (error) {
    console.log(error);
  }
};
