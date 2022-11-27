import RollAndAssetRelationship from '../models/rollAndAssetRelationship';

export const getAssetsOfRoll = async (request, response) => {
  try {
    const relationship = await RollAndAssetRelationship.find({ roll: request.params.rollId }).populate({
      path: 'asset',
    });
    response.status(200).json({
      relationship,
    });
  } catch (error) {
    console.log(error);
  }
};
