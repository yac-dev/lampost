import BadgeStatus from '../models/badgeStatus';

export const getUserBadgeStatus = async (request, response) => {
  try {
    const { user, badge } = request.body;
    const badgeStatus = await BadgeStatus.find({ user, badge });
    response.status(200).json({
      badgeStatus,
    });
  } catch (error) {
    console.log(error);
  }
};
