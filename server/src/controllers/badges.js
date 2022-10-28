import Badge from '../models/badge';
import BadgeStatus from '../models/badgeStatus';
import User from '../models/user';

export const getBadges = async (request, response) => {
  try {
    const filteringUserBadges = [];
    let badges = Badge.find({}); // grab all
    if (request.body.userId) {
      const user = await User.findById(request.body.userId).populate({
        path: 'badges',
        model: BadgeStatus,
        populate: {
          path: 'badge',
          model: Badge,
        },
      });

      for (let i = 0; i < user.badges.length; i++) {
        console.log(user.badges[i]);
        filteringUserBadges.push(user.badges[i].badge._id);
      }
      badges.where({ _id: { $nin: filteringUserBadges } });
    }

    let queryFilters = [];

    if (request.query.type) {
      const queryByType = { type: request.query.type };
      queryFilters.push(queryByType);
    }
    if (request.query.name) {
      const queryByName = { name: request.query.name };
      queryFilters.push(queryByName);
    }

    if (queryFilters.length) {
      badges = badges.where({ $and: queryFilters });
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

export const getBadgesByFilteringUserBadges = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
