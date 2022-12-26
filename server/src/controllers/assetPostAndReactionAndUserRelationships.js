import AssetPostAndReactionAndUser from '../models/assetPostAndReactionAndUserRelationship';
import Reaction from '../models/reaction';

export const createReaction = async (request, response) => {
  try {
    const { assetPostId, userId, content } = request.body;
    const reaction = await Reaction.create({
      content,
    });

    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUser.create({
      assetPost: assetPostId,
      reaction: reaction._id,
      user: userId,
    });

    response.status(200).json({
      reaction: {
        _id: reaction._id,
        content: reaction.content,
        totalCounts: 1,
        users: [userId],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReactionsByAssetPostId = async (request, response) => {
  try {
    const assetPostAndReactionAndUserRelationships = await AssetPostAndReactionAndUser.find({
      assetPost: request.params.assetPostId,
    }).populate([{ path: 'reaction' }]);

    const reactions = {};
    for (let i = 0; i < assetPostAndReactionAndUserRelationships.length; i++) {
      const object = {};
      if (reactions[assetPostAndReactionAndUserRelationships[i].reaction._id]) {
        reactions[assetPostAndReactionAndUserRelationships[i].users].push(
          assetPostAndReactionAndUserRelationships[i].user
        );
        reactions[assetPostAndReactionAndUserRelationships[i].totalCounts]++;
      } else {
        const object = {};
        object['_id'] = assetPostAndReactionAndUserRelationships[i].reaction._id;
        object['content'] = assetPostAndReactionAndUserRelationships[i].reaction.content;
        object['totalCounts'] = 1;
        object['users'] = [assetPostAndReactionAndUserRelationships[i].user];
        reactions[assetPostAndReactionAndUserRelationships[i].reaction._id] = object;
      }
    }

    response.status(200).json({
      reactions,
    });
  } catch (error) {
    console.log(error);
  }
};
