import mongoose from 'mongoose';

const friendRelationshipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }, //この、userっていうfieldいらないかもな。。。user schemaのarrayに直接、入れるからね。
  friend: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // status: {
  //   type: String,
  //   enum: ['pending', 'accepted', 'rejected'],
  //   default: 'pending',
  // }, // friend requestする場合で、別でrelのtableが必要になる感じかな。
  createdAt: {
    type: Date,
  },
});

const FriendRelationship = mongoose.model('FriendRelationship', friendRelationshipSchema);
export default FriendRelationship;
