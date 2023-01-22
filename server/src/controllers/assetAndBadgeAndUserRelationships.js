import AssetAndBadgeAndUserRelationship from '../models/assetAndBadgeAndUserRelationships';

export const upvoteBadge = async (request, response) => {
  try {
    const assetAndBadgeAndUserRelationship = await AssetAndBadgeAndUserRelationship.create({});

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
