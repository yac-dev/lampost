import User from '../models/user';
import Badge from '../models/badge';
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

export const addBadges = async (request, response) => {
  try {
    const { badgeIds } = request.body;
    const user = await User.findById(request.params.id);
    const badges = await Badge.find({ _id: { $in: badgeIds } });
    user.badges.push(badgeIds);
    user.save();
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
