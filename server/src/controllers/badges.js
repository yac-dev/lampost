import Badge from '../models/badge';
import BadgeStatus from '../models/badgeStatus';
import User from '../models/user';

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

    let user;
    const filteringUserBadges = [];
    if (request.body.userId) {
      console.log('filtering by userid');
      user = await User.findById(request.body.userId).populate({
        path: 'badges',
        model: BadgeStatus,
        populate: {
          path: 'badge',
          model: Badge,
        },
      });
      console.log('this is the user', user);

      for (let i = 0; user.badges.length; i++) {
        filteringUserBadges.push(user.badges[i].badge_id);
      }
      // badges.filter((badge) => !filteringUserBadges.includes(badge._id));
    }

    badges = await badges.skip(skip).limit(limit);
    // .filter((badge) => !filteringUserBadges.includes(badge._id));

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
