import Meetup from '../models/meetup';
import User from '../models/user';
import LoungeChat from '../models/loungeChat';
import Badge from '../models/badge';
import Comment from '../models/comment';
import schedule from 'node-schedule';
import MeetupAndUserRelationship from '../models/meetupAndUserRelationship';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import UserBadgeExperience from '../models/userBadgeExperience';

// この二つも、さらに一つのfunctionにまとめるべき。後で。
// const scheduleStartMeetup = async (startDateAndTime, meetupId) => {
//   schedule.scheduleJob(new Date(startDateAndTime), async () => {
//     // まず、ここでdeleteされたかの確認。
//     const meetup = await Meetup.findById(meetupId);
//     // deleteあsれてなければ
//     if (meetup) {
//       //updateされたかの確認。あとは、recursion
//       if (meetup.isStartDateAndTimeUpdated) {
//         scheduleStartMeetup(meetup.startDateAndTime, meetup._id);
//       } else {
//         meetup.state = 'ongoing';
//         console.log('meetup started');
//         meetup.save();
//         return;
//       }
//     }
//     // deleteされていれば、なんも動かさない。
//     else {
//       console.log('deleted...');
//     }
//   });
// };

// const scheduleEndMeetup = async (endDateAndTime, meetupId) => {
//   schedule.scheduleJob(new Date(endDateAndTime), async () => {
//     // まず、ここでdeleteされたかの確認。
//     const meetup = await Meetup.findById(meetupId);
//     // deleteあsれてなければ
//     if (meetup) {
//       //updateされたかの確認。あとは、recursion
//       if (meetup.isEndDateAndTimeUpdated) {
//         scheduleStartMeetup(meetup.endDateAndTime, meetup._id);
//       } else {
//         meetup.state = 'end';
//         console.log('finished schedule');
//         meetup.save();
//         return;
//       }
//     }
//     // deleteされていれば、なんも動かさない。
//     else {
//       console.log('deleted...');
//     }
//   });
// };

// これ、scheduleだけ、違うrouterでやった方がいいかな。
export const createMeetup = async (request, response) => {
  try {
    const {
      place,
      badges,
      title,
      startDateAndTime,
      duration,
      applicationDeadline,
      // endDateAndTime,
      isMeetupAttendeesLimitFree,
      meetupAttendeesLimit,
      isMeetupFeeFree,
      currency,
      fee,
      description,
      isMeetupPublic,
      isMediaAllowed,
      launcher,
      link,
    } = request.body;

    const badgeIds = badges.map((badge) => badge._id);

    const meetup = new Meetup({
      place,
      badges: badgeIds,
      // preferredBadges,
      title,
      startDateAndTime,
      duration,
      applicationDeadline,
      description,
      link,
      launcher,
      totalAttendees: 1,
      totalAssets: 0,
      totalComments: 0,
      totalImpressions: 0,
      topPhotos: [],
      createdAt: new Date(),
      // endDateAndTime,
    });

    // console.log(request.body);

    if (isMeetupFeeFree) {
      meetup.isFeeFree = true;
    } else {
      meetup.isFeeFree = false;
      meetup.currency = currency;
      meetup.fee = fee;
    }

    if (isMeetupAttendeesLimitFree) {
      meetup.isAttendeesLimitFree = true;
    } else {
      meetup.isAttendeesLimitFree = false;
      meetup.attendeesLimit = meetupAttendeesLimit;
    }

    if (isMeetupPublic) {
      meetup.isPublic = true;
    } else {
      meetup.isPublic = false;
    }

    if (isMediaAllowed) {
      meetup.isMediaAllowed = true;
    } else {
      meetup.isMediaAllowed = false;
    }

    const user = await User.findById(launcher);
    user.upcomingMeetups.push(meetup._id);
    user.save();
    // meetup.attendees.push(launcher);
    meetup.state = 'upcoming';
    meetup.save();
    const meetupAndUserRelationship = await MeetupAndUserRelationship.create({
      meetup: meetup._id,
      user: user._id,
      launcher: true,
      rsvp: true,
      viewedChatsLastTime: new Date(),
    });

    const badgeAndUserTables = badgeIds.map((badgeId) => {
      return {
        badge: badgeId,
        user: launcher,
      };
    });

    for (const table of badgeAndUserTables) {
      const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({ badge: table.badge, user: table.user });
      // meetupのlaunchでは、experienceを20あげる。
      if (badgeAndUserRelationship) {
        badgeAndUserRelationship.totalExperience = badgeAndUserRelationship.totalExperience + 20;
        await badgeAndUserRelationship.save();
        const userBadgeExperience = await UserBadgeExperience.create({
          badgeAndUserRelationship: badgeAndUserRelationship._id,
          type: 'meetupLaunch',
          experience: 20,
        });
      }
    }

    response.status(201).json({
      meetup: {
        _id: meetup._id,
        place: meetup.place,
        title: meetup.title,
        state: meetup.state, // upcomingなはず。
        launcher: meetup.launcher,
        startDateAndTime: meetup.startDateAndTime,
        badge: badges[0],
        // startDateAndTime: meetup.startDateAndTime,
        // badges: populatingBadges,
      },
      // viewedChatsLastTime: new Date(),
      launcher,
      // badge: {
      //   icon: badge.icon,
      // }
    });
  } catch (error) {
    console.log(error);
  }
};

// meetupのstateを変えて、かつuserのstateもかえないといけない。
export const startMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id);
    meetup.state = 'ongoing';
    meetup.save();
    // notifyを送る。

    response.status(200).json({
      meetupId: meetup._id,
      state: 'ongoing',
    });
  } catch (error) {
    console.log(error);
  }
};

// meetupのstateを変えて、かつmeetupとuserのpastmeetupのrelationshipを作る。
export const finishMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id);
    meetup.state = 'finished';
    meetup.save();
    // const users = await User.find({ _id: { $in: meetup.attendees } });

    // for (let i = 0; i < users.length; i++) {
    //   users[i].ongoingMeetup = { state: false };
    //   // users[i].logs++;
    //   for (let j = 0; j < users[i].upcomingMeetups.length; j++) {
    //     // console.log('heeeeeeeey', users[i].upcomingMeetups[j].meetup.toString(), meetup._id);
    //     // これ見ると、queryしてきたdocumentのidもObjectIdのinstance扱いになるんだな。。。このidの比較、面倒だな。
    //     if (users[i].upcomingMeetups[j].meetup.toString() === request.params.id) {
    //       console.log('removing');
    //       users[i].upcomingMeetups.splice(j, 1);
    //     }
    //   }
    //   users[i].save();
    // }

    // いらない。
    // const insertingArray = [];
    // // forEachって、新しいarrayを返してくんなかったけ？？
    // users.forEach((user) => {
    //   insertingArray.push({
    //     pastMeetup: meetup._id,
    //     user: user._id,
    //   });
    // });

    // const pastMeetupAndUserRelationship = await PastMeetupAndUserRelationship.insertMany(insertingArray);
    // pastmeetupのinsertmanyをやる感じか。。。。
    response.status(200).json({
      meetupId: meetup._id,
      state: 'finished',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetups = async (request, response) => {
  try {
    const meetups = await Meetup.find({ $or: [{ state: 'upcoming' }, { state: 'ongoing' }] })
      .select({ _id: 1, place: 1, startDateAndTime: 1, badges: 1 })
      .populate({
        path: 'badges',
        model: Badge,
        select: { icon: 1, color: 1 },
      });

    // 返すbadgeの数は一個でいい。それをどうするか。
    const modifiedMeetups = meetups.map((meetup) => {
      return {
        _id: meetup._id,
        place: meetup.place,
        startDateAndTime: meetup.startDateAndTime,
        badge: meetup.badges[0],
      };
    });
    // .populate({
    //   path: 'badges',
    //   model: Badge,
    // });
    // .populate({
    //   path: 'launcher',
    //   model: User,
    //   select: 'name photo',
    // })
    // .populate({
    //   path: 'attendees',
    //   model: User,
    //   select: 'name photo',
    // })
    // .populate({
    //   path: 'badges',
    //   model: Badge,
    // });
    response.status(200).json({
      meetups: modifiedMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMeetups = async (request, response) => {
  try {
    // meetupのidは、arrayで全部もっている。それで検索かければいい。
    const { upcomingMeetupIds } = request.body;
    const meetups = await Meetup.find({ _id: { $in: upcomingMeetupIds } }).select({
      _id: 1,
      launcher: 1,
      startDateAndTime: 1,
      state: 1,
      endDateAndTime: 1,
    });
    console.log(meetups, 'upcoming meetups');
    response.status(200).json({
      meetups,
    });
  } catch (error) {
    console.log(error);
  }
};

// attendeesは、link clickしたら出してあげる。
export const getSelectedMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id)
      .populate({
        path: 'launcher',
        model: User,
        select: 'name photo fame',
      })
      .populate({
        path: 'badges',
        model: Badge,
      });
    // .populate({
    //   path: 'comments',
    // })
    // .populate({
    //   path: 'attendees',
    //   select: 'name photo topBadges',
    //   populate: { path: 'topBadges' },
    // });
    // console.log('meetup selected!', meetup);
    response.status(200).json({
      meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id).populate({
      path: 'attendees',
      model: User,
    });
    // console.log(meetup);
    response.status(200).json({
      meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetupCrew = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id)
      .select({ attendees: 1 })
      .populate({
        path: 'attendees',
        model: User,
        select: 'name photo topBadges',
        populate: { path: 'topBadges' },
        // populate: {
        //   path: 'skills',
        //   model: Badge,
        // },
      });
    console.log(meetup, 'getting crew');
    response.status(200).json({
      attendees: meetup.attendees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (request, response) => {
  try {
    const { userId, content, replyTo } = request.body;
    const comment = await Comment.create({
      meetup: request.params.id,
      user: userId,
      content,
      replyTo,
      createdAt: new Date(),
    });

    const meetup = await Meetup.findById(request.params.id);
    meetup.comments.push(comment._id);
  } catch (error) {
    console.log(error);
  }
};

export const getMeetupComments = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id)
      .select({ comments: 1 })
      .populate({
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'user',
            model: User,
            select: 'name photo _id',
          },
          {
            path: 'replyTo',
            model: Comment,
          },
        ],
      });

    response.status(200).json({
      meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const joinMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id);
    // .populate({
    //   path: 'attendees',
    //   model: User,
    // });
    meetup.totalAttendees++;
    meetup.attendees.push(request.body.userId);
    meetup.save();
    const user = await User.findById(request.body.userId);
    const meetupObj = {
      meetup: meetup._id,
      viewedChatsLastTime: new Date(),
    };
    user.upcomingMeetups.push(meetupObj);
    user.save();

    const loungeChats = await LoungeChat.find({ meetup: meetup._id }).populate({
      path: 'user',
      select: 'name photo',
    });

    response.status(200).json({
      meetupObject: {
        meetup: {
          _id: meetup._id,
          title: meetup.title,
          state: meetup.state,
          launcher: meetup.launcher,
          startDataAndTime: meetup.startDateAndTime,
        },
        viewedChatsLastTime: new Date(),
        loungeChats,
      },
      totalAttendees: meetup.totalAttendees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id);
    // .populate({
    //   path: 'attendees',
    //   model: User,
    // });
    const indexOfUser = meetup.attendees.indexOf(request.body.userId);
    if (indexOfUser > -1) {
      meetup.attendees.splice(indexOfUser, 1);
    }
    console.log(meetup.attendees, 'removing this index', indexOfUser);
    meetup.totalAttendees--;
    meetup.save();
    const user = await User.findById(request.body.userId);
    let indexOfMeetup = 0;
    for (let i = 0; i < user.upcomingMeetups.length; i++) {
      if (user.upcomingMeetups[i].meetup === meetup._id) {
        indexOfMeetup = i;
      }
    }
    // const indexOfMeetup = user.upcomingMeetups.indexOf(meetup._id);
    if (indexOfMeetup > -1) {
      user.upcomingMeetups.splice(indexOfMeetup, 1);
    }
    user.save();
    response.status(200).json({
      meetupId: meetup._id,
      totalAttendees: meetup.totalAttendees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMeetup = async (request, response) => {
  try {
    // ここでmeetupをupdateして、かつそのmeetupにisUpdatedの印をつけて、ここでscheduleのprocessを始める。この流れでいいはず。
  } catch (error) {
    console.log(error);
  }
};

// export const startMeetup = async (request, response) => {
//   try {
//     const meetup = await Meetup.findById(request.params.meetupId).populate({
//       path: 'attendees',
//     });

//     for (let i = 0; i < meetup.attendees; i++) {
//       meetup.attendees[i].isInMeetup = true;
//       meetup.attendees[i].save();
//     }
//     meetup.state = 'ongoing';
//     meetup.save();
//     response.status(200).json({
//       message: 'success',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getMyMeetupStates = async (request, response) => {
  try {
    const { upcomingMeetupIds, userId } = request.body;
    const myUpcomingMeetups = {};
    const alreadyFinishedMeetups = {};
    // client side側で持っているmeetupidをこっちに送って、そのmeetupのstateをcheckする。
    const meetups = await Meetup.find({ _id: { $in: upcomingMeetupIds }, state: { $ne: 'finished' } });
    meetups.forEach((meetup) => {
      // if (meetup.state !== 'finished') {
      myUpcomingMeetups[meetup._id] = {
        _id: meetup._id,
        title: meetup.title,
        startDateAndTime: meetup.startDateAndTime,
        state: meetup.state,
        launcher: meetup.launcher,
      };
      // }
      // else {
      //   alreadyFinishedMeetups[meetup._id] = true;
      // }
    });
    console.log(myUpcomingMeetups);

    // if (Object.values(alreadyFinishedMeetups).length) {
    //   const user = await User.findById(userId);
    //   user.upcomingMeetups.forEach((meetup) => {
    //     // 配列から除く。めんどいから後で。
    // }

    response.status(200).json({
      myUpcomingMeetups,
    });
    // const meetupAndUserRelationship = await MeetupAndUserRelationship.find(queryConditon);
  } catch (error) {
    console.log(error);
  }
};

export const checkIsMeetupOngoing = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id);
    let bool;
    if (meetup.state === 'ongoing') {
      bool = true;
    } else {
      bool = false;
    }
    response.status(200).json({
      isMeetupOngoing: bool,
    });
  } catch (error) {
    console.log(error);
  }
};
