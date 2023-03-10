import FriendRelationship from '../models/friendRelationship';

export const createFriendRelationship = async (request, response) => {
  try {
    const { friendId } = request.body;
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
    const friendRelationships = await FriendRelationship.find({ userId });
    const friendIds = friendRelationships.map((relationship) => {
      return relationship.friend;
    });
    console.log(friendIds);

    response.status(200).json({
      friendIds,
    });
  } catch (error) {
    console.log(error);
  }
};
