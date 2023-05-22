import BadgeAndBadgeTypeRelationship from '../models/badgeAndBadgeTypeRelationship';
import Icon from '../models/icon';

// schemaこれ、
// badge: {
//   type: mongoose.Schema.ObjectId,
//   ref: 'Badge',
// },
// badgeType: {
//   type: mongoose.Schema.ObjectId,
//   ref: 'BadgeType',
// },

// badgeのschema
//

export const getBadgesByType = async (request, response) => {
  try {
    const badgeAndBadgeTypeRelationships = await BadgeAndBadgeTypeRelationship.find({
      badgeType: request.params.badgeTypeId,
    }).populate({
      path: 'badge',
      select: 'icon color name _id',
      populate: {
        path: 'icon',
        select: 'url name',
        model: Icon,
      },
    });

    const badges = badgeAndBadgeTypeRelationships.map((relationship) => {
      return relationship.badge;
    });
    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};
