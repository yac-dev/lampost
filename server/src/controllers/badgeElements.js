import BadgeElement from '../models/badgeElement';

export const getBadgeElements = async (request, response) => {
  try {
    const badgeElements = await BadgeElement.find();
    response.status(200).json({
      badgeElements,
    });
  } catch (error) {
    console.log(error);
  }
};
