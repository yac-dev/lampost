import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import Asset from '../models/asset';
import Library from '../models/library';
import Icon from '../models/icon';
import Reaction from '../models/reaction';

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

export const getLibraryAssetsByMonth = async (request, response) => {
  try {
    const { yearAndMonth } = request.query;
    const year = yearAndMonth.split('-')[0];
    const month = yearAndMonth.split('-')[1];

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    // const libraryAssets = [];
    const libraryAssets = await LibraryAndAssetRelationship.find({
      library: request.params.libraryId,
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate({
      path: 'asset',
      select: 'data createdAt type',
    });

    response.status(200).json({
      libraryAssets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLibraryAssetsByDate = async (request, response) => {
  try {
    // これも同様に、その日の0時から23:59まででfetchしてくればいいか。
    const { datestring } = request.query;
    const year = datestring.split('-')[0];
    const month = datestring.split('-')[1];
    const day = datestring.split('-')[2];
    const startDate = new Date(Date.UTC(year, month - 1, day, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59));
    const libraryAndAssets = await LibraryAndAssetRelationship.find({
      library: request.params.libraryId,
      createdAt: { $gte: startDate, $lt: endDate },
    })
      .populate({
        path: 'asset',
        select: 'data type meetup createdBy createdAt mood taggedPeople',
        populate: [
          {
            path: 'meetup',
            select: 'title',
          },
          {
            path: 'createdBy',
            select: 'name photo',
          },
          {
            path: 'taggedPeople',
            select: 'photo',
          },
        ],
      })
      .populate({
        path: 'reactions.reaction',
        model: 'Reaction',
        populate: {
          path: 'reactionIcon',
          model: 'ReactionIcon',
        },
      })
      .populate({
        path: 'reactions.user',
        model: 'User',
        select: 'name photo',
      });

    response.status(200).json({
      libraryAndAssets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAssetsByLibraryId = async (request, response) => {
  try {
    const { assetId, userId } = request.body;
    const library = await Library.findById(request.params.libraryId);
    const asset = await Asset.findById(assetId);
    library.totalAssets++;
    library.mood = asset.mood;
    library.save();

    const libraryAndAssetRelationship = await LibraryAndAssetRelationship.create({
      asset: assetId,
      library: request.params.libraryId,
      user: userId,
      createdAt: new Date(),
    });

    response.status(200).json({
      libraryAndAssetRelationship,
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
    console.log();
    libraryAndAssetRelationship.reactions.push({
      reaction: request.body.reactionId,
      user: request.body.userId,
    });
    // libraryAndAssetRelationship.reactions.forEach((reactionObject) => {
    //   console.log(reactionObject.reaction);
    //   console.log(request.body.reactionId);
    //   if (reactionObject.reaction.toString() === request.body.reactionId) {
    //     reactionObject.upvoted++;
    //     reactionObject.users.push(request.body.userId);
    //   }
    // });
    libraryAndAssetRelationship.save();
    response.status(200).json({
      libraryAndAssetRelationship,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (request, response) => {
  try {
    const { libraryId, assetId } = request.params;
    const { userId, comment } = request.body;
    const libraryAndAssetRelationship = await LibraryAndAssetRelationship.findOne({
      library: libraryId,
      asset: assetId,
    });
    console.log(comment);
    libraryAndAssetRelationship.reactions.forEach((reactionObject) => {
      if (reactionObject.user.toString() === userId) {
        reactionObject.comment = comment;
      }
    });
    libraryAndAssetRelationship.save();
    response.status(201).json({
      libraryAndAssetRelationship,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostedAssets = async (request, response) => {
  try {
    const { libraryId, userId } = request.params;
    const libraryAndAssetRelationship = await LibraryAndAssetRelationship.find({ library: libraryId, user: userId });
    const assetIds = libraryAndAssetRelationship.map((relationship) => relationship.asset);
    response.status(200).json({
      assetIds,
    });
  } catch (error) {
    console.log(error);
  }
};
