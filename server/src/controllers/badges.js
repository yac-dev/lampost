import Badge from '../models/badge';

export const getBadges = async (request, response) => {
  try {
    let queryFilters = [];

    if (request.query.type) {
      const queryByType = { type: request.query.type };
      queryFilters.push(queryByType);
    }
    if (request.query.name) {
      const queryByName = { name: request.query.name };
      queryFilters.push(queryByName);
    }
    let badges;
    if (queryFilters.length) {
      badges = Badge.find({ $and: queryFilters });
    } else {
      badges = Badge.find({});
    }
    const limit = 50;
    const page = request.query.page;
    const skip = (page - 1) * limit;

    badges = await badges.skip(skip).limit(limit);

    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
