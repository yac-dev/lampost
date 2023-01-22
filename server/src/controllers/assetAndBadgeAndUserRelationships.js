import AssetAndBadgeAndUserRelationship from '../models/assetAndBadgeAndUserRelationships';
import Asset from '../models/asset';

export const upvoteBadgeLike = async (request, response) => {
  try {
    const { assetId, badgeId, userId } = request.body;
    const assetAndBadgeAndUserRelationship = await AssetAndBadgeAndUserRelationship.create({
      asset: assetId,
      badge: badgeId,
      user: userId,
    });

    const asset = await Asset.findById(assetId);
    for (let i = 0; i < asset.badges.length; i++) {
      if (asset.badges[i].badge.toString() === badgeId.toString()) {
        asset.badges[i].totalCounts = asset.badges[i].totalCounts + 1;
        asset.save();
      }
    }
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeLikes = async (request, response) => {
  try {
    const assetAndBadgeAndUserRelationships = await AssetAndBadgeAndUserRelationship.find({
      asset: request.params.assetId,
    });
    // [{asset: asset1, badge: badge1, user: user1}, {asset: asset1, badge: badge3, user: user5}]
    const table = {};
    for (let i = 0; i < assetAndBadgeAndUserRelationships.length; i++) {
      if (!table[assetAndBadgeAndUserRelationships[i].badge]) {
        table[assetAndBadgeAndUserRelationships[i].badge] = [assetAndBadgeAndUserRelationships[i].user];
      } else {
        table[assetAndBadgeAndUserRelationships[i].badge].push(assetAndBadgeAndUserRelationships[i].user);
      }
    }

    response.status(200).json({
      table,
    });
    // for (let i = 0; i < assetAndReactionAndUserRelationships.length; i++) {
    //   if (reactions[assetAndReactionAndUserRelationships[i].reaction._id]) {
    //     reactions[assetAndReactionAndUserRelationships[i].users][assetAndReactionAndUserRelationships[i].user._id] =
    //       assetAndReactionAndUserRelationships[i].user; // hash tableでまとめる。
    //     reactions[assetAndReactionAndUserRelationships[i].totalCounts]++;
    //   } else {
    //     const object = {};
    //     object['_id'] = assetAndReactionAndUserRelationships[i].reaction._id;
    //     object['content'] = assetAndReactionAndUserRelationships[i].reaction.content;
    //     object['totalCounts'] = 1;
    //     object['users'] = {
    //       [assetAndReactionAndUserRelationships[i].user._id]: assetAndReactionAndUserRelationships[i].user,
    //     };
    //     reactions[assetAndReactionAndUserRelationships[i].reaction._id] = object;
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};
