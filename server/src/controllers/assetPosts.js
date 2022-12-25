import AssetPost from '../models/assetPost';
import AssetPostAndReactionAndUser from '../models/assetPostAndReactionAndUserRelationship';

export const createAssetPost = async (request, response) => {
  try {
    const { caption, userId, libraryId, assets } = request.body;
    const assetPost = await AssetPost.create({
      caption,
      assets,
      user: userId,
      library: libraryId,
      createdAt: new Date(),
      totalReactions: 0,
      firstThreeReactions: [],
    });

    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};
