import mongoose from 'mongoose';

const loungeChatAndChatRoomRelationshipSchema = new mongoose.Schema({
  loungeChat: {
    type: mongoose.Schema.ObjectId,
    ref: 'LoungeChat',
  },
  chatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChatRoom',
  },
});

const LoungeChatAndChatRoomRelationship = mongoose.model(
  'LoungeChatAndChatRoomRelationship',
  loungeChatAndChatRoomRelationshipSchema
);

export default LoungeChatAndChatRoomRelationship;
