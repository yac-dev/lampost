import AssetPostAndReactionAndUserRelationship from '../models/assetPostAndReactionAndUserRelationship';
import Reaction from '../models/reaction';
import AssetPost from '../models/assetPost';

export const createReaction = async (request, response) => {
  try {
    const { assetPostId, userId, content } = request.body;
    const reaction = await Reaction.create({
      content,
    });

    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.create({
      assetPost: assetPostId,
      reaction: reaction._id,
      user: userId,
    });

    const assetPost = await AssetPost.findById(assetPostId);
    if (assetPost.firstFourReactions.length < 5) {
      const reactionObject = {
        reaction: reaction._id,
        totalCounts: 1,
      };
      assetPost.firstFourReactions.push(reactionObject);
    }

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
    const assetPostAndReactionAndUserRelationships = await AssetPostAndReactionAndUserRelationship.find({
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

export const upvoteReaction = async (request, response) => {
  try {
    const { assetPostId, reactionId, userId } = request.body;
    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.create({
      assetPost: assetPostId,
      reaction: reactionId,
      user: userId,
    });

    const assetPost = await AssetPost.findById(assetPostId);
    for (i = 0; i < assetPost.firstFourReactions.length; i++) {
      if (assetPost.firstFourReactions[i].reaction === assetPostId) {
        assetPost.firstFourReactions[i].totalCounts++;
      }
    }
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const downvoteReaction = async (request, response) => {
  try {
    const { assetPostId, reactionId, userId } = request.body;
    console.log(assetPostId, reactionId, userId);
    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.deleteOne({
      assetPost: assetPostId,
      reaction: reactionId,
      user: userId,
    });

    const assetPost = await AssetPost.findById(assetPostId);
    for (i = 0; i < assetPost.firstFourReactions.length; i++) {
      if (assetPost.firstFourReactions[i].reaction === assetPostId) {
        assetPost.firstFourReactions[i].totalCounts--;
      }
    }

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
