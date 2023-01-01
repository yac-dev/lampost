import BadgeTag from '../models/badgeTag';

export const getBadgeTagsByBadgeId = async (request, response) => {
  try {
    const badgeTags = await BadgeTag.find({ badge: request.params.badgeId });
    response.status(200).json({
      badgeTags,
    });
  } catch (error) {
    console.log(error);
  }
};
