import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import Asset from '../models/asset';
import Library from '../models/library';

export const getAssetsByLibraryId = async (request, response) => {
  try {
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.find({
      library: request.params.libraryId,
    }).populate({
      path: 'asset',
      select: 'type data effect',
    });

    const assets = libraryAndAssetRelationships.map((relationship) => {
      return relationship.asset;
    });

    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAsset = async (request, response) => {
  try {
    const libraryAndAssetRelationship = await LibraryAndAssetRelationship.findOne({
      library: request.params.libraryId,
      asset: request.params.assetId,
    })
      .populate({
        path: 'asset',
        populate: [
          {
            path: 'createdBy',
            select: 'name photo',
          },
          {
            path: 'meetup',
            select: 'title',
          },
          {
            path: 'taggedPeople',
            select: 'name photo',
          },
        ],
      })
      .populate({
        path: 'reactions',
        populate: {
          path: 'reaction',
        },
      });
    // .populate({
    //   path: 'reactions',
    //   populate: {
    //     path: 'reaction',
    //   },
    // });
    // const asset = await Asset.findById(request.params.assetId).populate([
    //   {
    //     path: 'createdBy',
    //     select: 'name photo',
    //   },
    //   {
    //     path: 'meetup',
    //     select: 'title',
    //   },
    //   {
    //     path: 'taggedPeople',
    //     select: 'name photo',
    //   },
    //   {
    //     path: 'badges',
    //     select: 'name icon color',
    //   },
    // ]);

    response.status(200).json({
      libraryAndAssetRelationship,
      // asset: libraryAndAssetRelationships.asset,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const createReaction = async(request, response) => {
//   try{
//     const libraryAndAssetRelationship = await LibraryAndAssetRelationship.findOne({libraryAsset: request.params.libraryAndAssetRelationshipId,
//     reaction:
//     })
//   } catch(error){
//     console.log(error);
//   }
// }

export const postAssetsByLibraryId = async (request, response) => {
  try {
    const { assetId } = request.body;
    const library = await Library.findById(request.params.libraryId);
    const libraryBadges = library.badges;
    const asset = await Asset.findById(assetId);
    console.log('library badgeIds', libraryBadges);
    console.log('asset is ', asset);

    // loopが動かない。lengthがないと。
    if (!asset.badges.length) {
      asset.badges.push(...libraryBadges);
      asset.save();
    } else {
      for (let i = 0; i < libraryBadges.length; i++) {
        if (asset.badges.some((badgeId) => badgeId.toString() === libraryBadges[i])) {
          null;
        } else {
          asset.badges.push(libraryBadges[i]);
        }
      }
      asset.save();
    }

    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.create({
      asset: assetId,
      library: request.params.libraryId,
    });
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createReaction = async (request, response) => {
  try {
    const libraryAndAssetRelationship = await LibraryAndAssetRelationship.findOne({
      library: request.params.libraryId,
      asset: request.params.assetId,
    });
    // console.log('lib and asset rel', libraryAndAssetRelationship);
    // console.log(request.body.reactionId, request.body.userId);
    libraryAndAssetRelationship.reactions.forEach((reactionObject) => {
      console.log(reactionObject.reaction);
      console.log(request.body.reactionId);
      if (reactionObject.reaction.toString() === request.body.reactionId) {
        reactionObject.upvoted++;
        reactionObject.users.push(request.body.userId);
      }
    });
    libraryAndAssetRelationship.save();
    response.status(200).json({
      libraryAndAssetRelationship,
    });
  } catch (error) {
    console.log(error);
  }
};
