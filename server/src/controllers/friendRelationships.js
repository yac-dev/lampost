import FriendRelationship from '../models/friendRelationship';
import User from '../models/user';

export const createFriendRelationship = async (request, response) => {
  try {
    const { friendId, launcherId } = request.body;
    const friendRelationship = await FriendRelationship.create({
      user: request.params.userId,
      friend: friendId,
      // status: 'accepted',
      createdAt: Date.now(),
    });
    const friendRelationship2 = await FriendRelationship.create({
      user: friendId,
      friend: request.params.userId,
      createdAt: Date.now(),
    });

    const launcher = await User.findById(launcherId);
    launcher.fame = launcher.fame + 10;
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
    const friends = friendRelationships.map((relationship) => {
      return relationship.friend;
    });

    response.status(200).json({
      friends,
    });
  } catch (error) {
    console.log(error);
  }
};
