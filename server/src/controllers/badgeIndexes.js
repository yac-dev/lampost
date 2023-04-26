import BadgeIndex from '../models/badgeIndex';

export const getBadgeIndexes = async (request, response) => {
  try {
    const badgeIndexes = await BadgeIndex.find({ user: request.params.userId });
    response.status(200).json({
      badgeIndexes,
    });
  } catch (error) {
    console.log(error);
  }
};
