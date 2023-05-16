import IconAndIconTypeRelationship from '../models/iconAndIconTypeRelationship';

export const getIconsByIconType = async (request, response) => {
  try {
    const iconAndIconTypeRelationships = await IconAndIconTypeRelationship.find({
      iconType: request.params.iconTypeId,
    }).populate({
      path: 'icon',
    });
    const icons = iconAndIconTypeRelationships.map((relationship) => {
      return relationship.icon;
    });
    response.status(200).json({
      icons,
    });
  } catch (error) {
    console.log(error);
  }
};
