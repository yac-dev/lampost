import BadgeTypeAndBadgeRelationship from '../models/badgeTypeAndBadgeRelationship';

export const getBadgesByType = async (request, response) => {
  try {
    const badgeTypeAndBadgeRelationships = await BadgeTypeAndBadgeRelationship.find({
      badgeType: request.params.badgeTypeId,
    }).populate({
      path: 'badge',
    });
    const badges = badgeTypeAndBadgeRelationships.map((relationship) => {
      return relationship.badge;
    });
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
