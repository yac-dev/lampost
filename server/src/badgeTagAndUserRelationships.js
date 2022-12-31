import BadgeTag from './models/badgeTag';
import BadgeTag from './models/badgeTag';
import BadgeTagAndUserRelationship from './models/badgeTagAndUserRelationship';

export const addNewBadgeTagToUser = async (request, response) => {
  try {
    const { name } = request.body;
    const badgeTag = await BadgeTag.create({
      name,
      totalHolders: 1,
    });

    const badgeTagAndUserRelationship = await BadgeTagAndUserRelationship.create({
      badgeTag: BadgeTag._id,
      user: request.body.userId,
    });

    response.status(200).json({
      badgeTag,
    });
  } catch (error) {
    console.log(error);
  }
};
