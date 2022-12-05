import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';

export const addBadgesToUser = async (request, response) => {
  try {
    const { badgeIds, userId } = request.body;
    const relationshipObjects = badgeIds.map((badgeId) => {
      return {
        badge: badgeId,
        user: userId,
        createdAt: new Date(),
      };
    });
    // これ、array of objects [{badgeId: 111, userId: 3333, url: '', createdAt: new Date()}, {badgeId: 2222, userId: 3333}]でinsertManyだな。
    const badgeAndUserRelationships = await BadgeAndUserRelationship.insertMany(relationshipObjects);
    await badgeAndUserRelationships.populate({ path: 'badge', select: 'name icon color' });
    const badges = badgeAndUserRelationships.map((relationship) => {
      return {
        badge: relationship.badge,
        url: relationship.url,
      };
    });
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgesByUserId = async (request, response) => {
  try {
    const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.params.userId }).populate({
      path: 'badge',
      select: 'name icon color',
    });
    const badges = badgeAndUserRelationships.map((relationship) => {
      return relationship.badge;
    });
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
