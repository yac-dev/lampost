import Badge from '../models/badge';

export const getBadges = async (request, response) => {
  try {
    const badges = await Badge.find();
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
