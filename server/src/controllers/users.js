import User from '../models/user';
import ChatRoom from '../models/chatRoom';

export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const connectUser = async (request, response) => {
  try {
    const { userId } = request.body;
    const user = await User.findById(request.params.id);
    const chatRoom = await ChatRoom.create({});
    const connectionObject = {
      user: userId,
      chatRoom: chatRoom._id,
      viewedChatsLastTime: new Date(),
    };
    user.connections.push(connectionObject);
    user.save();
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
