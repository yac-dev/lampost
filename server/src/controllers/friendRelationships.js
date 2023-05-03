import FriendRelationship from '../models/friendRelationship';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';
import FriendChatRoom from '../models/friendChatRoom';
import FriendChatRoomAndUserRelationship from '../models/friendChatRoomAndUserRelationship';

export const createFriendRelationship = async (request, response) => {
  try {
    const { friendId, launcherId } = request.body;

    const friendChatRoom = await FriendChatRoom.create({
      users: [request.params.userId, friendId],
    });

    const friendRelationship = await FriendRelationship.create({
      user: request.params.userId,
      friend: friendId,
      friendChatRoom: friendChatRoom._id,
      createdAt: Date.now(),
    });
    const friendRelationship2 = await FriendRelationship.create({
      user: friendId,
      friend: request.params.userId,
      friendChatRoom: friendChatRoom._id,
      createdAt: Date.now(),
    });
    const user = await User.findById(friendId);
    const notificationMessage = {
      to: user.pushToken,
      data: { notificationType: 'friendshipBuilt' },
      title: 'New friend 😁',
      body: `You became friends with ${user.name}!`,
    };
    sendPushNotification(user.pushToken, notificationMessage);

    const launcher = await User.findById(launcherId);
    launcher.fame = launcher.fame + 7;
    launcher.save();

    response.status(201).json({
      friendId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyFriends = async (request, response) => {
  try {
    const { userId } = request.params;
    const friendRelationships = await FriendRelationship.find({ user: userId }).populate({
      path: 'friend',
      select: '_id name photo topBadges',
    });
    const myFriends = friendRelationships.map((relationship) => {
      return {
        _id: relationship._id,
        friend: relationship.friend,
        // friendChatRoom: relationship.friendChatRoom,
      };
    });

    console.log(myFriends);

    response.status(200).json({
      myFriends,
    });
  } catch (error) {
    console.log(error);
  }
};
