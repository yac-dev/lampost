import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }, //この、userっていうfieldいらないかもな。。。
  with: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  chatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChatRoom',
  },
  viewedChatsLastTime: Date,
});

const Connection = mongoose.model('Connection', connectionSchema);
export default Connection;
