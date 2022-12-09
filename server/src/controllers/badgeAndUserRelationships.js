import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';

export const addBadgesToUser = async (request, response) => {
  try {
    const { badgeIds } = request.body;
    const relationshipObjects = badgeIds.map((badgeId) => {
      return {
        badge: badgeId,
        user: request.params.userId,
        createdAt: new Date(),
      };
    });
    // これ、array of objects [{badgeId: 111, userId: 3333, url: '', createdAt: new Date()}, {badgeId: 2222, userId: 3333}]でinsertManyだな。
    const badgeAndUserRelationships = await BadgeAndUserRelationship.insertMany(relationshipObjects);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeDatasByUserId = async (request, response) => {
  try {
    const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.params.userId }).populate({
      path: 'badge',
      select: 'name icon color',
    });
    const userBadgeDatas = badgeAndUserRelationships.map((relationship) => {
      return {
        badge: relationship.badge,
        url: relationship.url,
        tags: relationship.tags,
      };
    });
    response.status(200).json({
      userBadgeDatas,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeDetailByUserId = async (request, response) => {
  try {
    const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({
      badge: request.params.badgeId,
      user: request.params.userId,
    }).populate({ path: 'badge' }); // {}
    // さらに、badge holders全員を取ってくる。
    const badgeHolders = await BadgeAndUserRelationship.find({ badge: request.params.badgeId }).populate({
      path: 'user',
      select: 'name photo',
    });
    response.status(200).json({
      badgeDetail: {
        badge: badgeAndUserRelationship.badge,
        url: badgeAndUserRelationship.url,
        tags: badgeAndUserRelationship.tags,
        badgeHolders,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeHolders = async (request, response) => {
  try {
    const badgeAndUserRelationship = await BadgeAndUserRelationship.find({ badge: request.params.badgeId }).populate({
      path: 'user',
      select: 'name photo',
    });

    const badgeHolders = badgeAndUserRelationship.map((relationship) => {
      return relationship.user;
    });
    response.status(200).json({
      badgeHolders,
    });
  } catch (error) {
    console.log(error);
  }
};
