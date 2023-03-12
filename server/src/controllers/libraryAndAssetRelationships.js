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
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.findOne({
      library: request.params.libraryId,
      asset: request.params.assetId,
    }).populate({
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
        {
          path: 'badges',
          select: 'name icon color',
        },
      ],
    });
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
      asset: libraryAndAssetRelationships.asset,
    });
  } catch (error) {
    console.log(error);
  }
};

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
