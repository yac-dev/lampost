import User from '../models/user';
import BadgeStatus from '../models/badgeStatus';
import Badge from '../models/badge';
import ChatRoom from '../models/chatRoom';
import Meetup from '../models/meetup';
import Asset from '../models/asset';

export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id).populate({
      path: 'badges',
      model: BadgeStatus,
      populate: {
        path: 'badge',
        model: Badge,
      },
    });
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const connectUser = async (request, response) => {
  try {
    const { userId } = request.body;
    const user = await User.findById(request.params.id);
    const chatRoom = await ChatRoom.create({});
    const connectionObject = {
      user: userId,
      chatRoom: chatRoom._id,
      viewedChatsLastTime: new Date(),
    };
    user.connections.push(connectionObject);
    user.save();
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addBadges = async (request, response) => {
  try {
    // array of objectsを作らないといかん。
    const { badgeIds } = request.body;
    console.log(badgeIds);
    const arr = badgeIds.map((badgeId) => {
      return { badge: badgeId, totalVotes: 0 };
    });

    const user = await User.findById(request.params.id);
    let badgeStatuses = await BadgeStatus.create(arr); // create populateって無理なのかね。。。まあいいか。
    // 再度queryするしかないな。
    const bss = await BadgeStatus.find({
      _id: {
        $in: badgeStatuses.map((badgeStatus) => {
          return badgeStatus._id;
        }),
      },
    });
    // console.log(badgeStatuses);
    user.badges.push(...badgeStatuses);
    user.save();
    // badgeStatuses = await badgeStatuses.populate('badge').execPopulate();
    // console.log(badgeStatuses);
    response.status(200).json({
      badges: bss,
    });
  } catch (error) {
    console.log(error);
  }
};

// これ, userではなくmeetup側にcontrollerを設定した方がいいわ。紛らわしい。
export const getPastMeetups = async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
      .select({ pastMeetups: 1, assets: 1, badge: 1 })
      .populate({
        path: 'pastMeetups',
        model: Meetup,
        populate: [
          {
            path: 'assets',
            model: Asset,
          },
          {
            path: 'badge',
            model: Badge,
          },
          {
            path: 'launcher',
            model: User,
          },
        ],
      });

    response.status(200).json({
      pastMeetups: user.pastMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};
