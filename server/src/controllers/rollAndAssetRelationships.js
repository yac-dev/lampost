import RollAndAssetRelationship from '../models/rollAndAssetRelationship';

export const getRollAssets = async (request, response) => {
  try {
    const rollAndAssetRelationships = await RollAndAssetRelationship.find({ roll: request.params.rollId }).populate({
      path: 'asset',
    });
    const assets = rollAndAssetRelationships.map((relationship) => {
      return relationship.asset;
    });
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};
