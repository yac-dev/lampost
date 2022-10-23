import Badge from '../models/badge';

export const getBadges = async (request, response) => {
  try {
    let queryFilter = {};
    if (request.query.type) {
      queryFilter = { type: request.query.type };
    }
    // ?type=sports&type=foodAndBeverage&page=1
    let badges = Badge.find(queryFilter);
    const limit = 50;
    const page = request.query.page; // load moreで、自動で+1ずつincrementされていく。client側で。
    const skip = (page - 1) * limit;

    badges = await badges.skip(skip).limit(limit);

    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
