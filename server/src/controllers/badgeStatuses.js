import BadgeStatus from '../models/badgeStatus';

export const getBadgeStatus = async (request, response) => {
  try {
    const badgeStatus = await BadgeStatus.findById(request.params.id);
    console.log(badgeStatus);
    response.status(200).json({
      badgeStatus,
    });
  } catch (error) {
    console.log(error);
  }
};
