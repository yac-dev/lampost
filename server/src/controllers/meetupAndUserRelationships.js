import MeetupAndUserRelationship from '../models/meetupAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';
import UserBadgeExperience from '../models/userBadgeExperience';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();
import { sendPushNotification } from '../services/expo-push-sdk';
import Icon from '../models/icon';

export const joinMeetup = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    const meetupAndUserRelationship = await MeetupAndUserRelationship.create({
      meetup: meetupId,
      user: userId,
      launcher: false,
      viewedChatsLastTime: new Date(),
      rsvp: false,
      createdAt: new Date(),
    });
    // ここ、いちいちqueryするの、めんどいよね。totalAttendeesだけを変えるだけだから、別にいらないかも。
    const meetup = await Meetup.findById(meetupId);
    meetup.totalAttendees++;
    meetup.save();
    const user = await User.findById(request.body.userId);
    // user.upcomingMeetups.push(meetupId);
    // user.save();
    // notificationを送る。
    const launcher = await User.findById(meetup.launcher);
    if (launcher) {
      const notificationMessage = {
        to: launcher.pushToken,
        data: { notificationType: 'joinedMeeetup' },
        title: `${user.name} joined ${meetup.title}`,
      };
      sendPushNotification(launcher.pushToken, notificationMessage);
    }

    response.status(200).json({
      meetup: {
        _id: meetup._id,
        title: meetup.title,
        state: meetup.state,
        launcher: meetup.launcher,
        startDataAndTime: meetup.startDateAndTime,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveMeetup = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    const meetup = await Meetup.findById(meetupId);
    // .populate({
    //   path: 'attendees',
    //   model: User,
    // });
    // const indexOfUser = meetup.attendees.indexOf(request.body.userId);
    // if (indexOfUser > -1) {
    //   meetup.attendees.splice(indexOfUser, 1);
    // }
    const meetupAndUserRelationship = await MeetupAndUserRelationship.deleteOne({ meetup: meetupId, user: userId });
    // console.log(meetup.attendees, 'removing this index', indexOfUser);
    meetup.totalAttendees--;
    meetup.save();
    // const user = await User.findById(userId);
    // let indexOfMeetup = 0;
    // for (let i = 0; i < user.upcomingMeetups.length; i++) {
    //   if (user.upcomingMeetups[i] === meetupId) {
    //     indexOfMeetup = i;
    //   }
    // }
    // // const indexOfMeetup = user.upcomingMeetups.indexOf(meetup._id);
    // if (indexOfMeetup > -1) {
    //   user.upcomingMeetups.splice(indexOfMeetup, 1);
    // }
    // user.save();
    console.log('left meetup');
    response.status(200).json({
      meetupId: meetupId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserMeetups = async (request, response) => {
  try {
    // meetupをqueryして、かつtitleとstartDateAndTimeとassetsを取ってくる感じかな。まあ、最初はtitleとstartDateAndTimeだけでいい。
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'meetup',
      select: 'title startDateAndTime state launcher badges topPhotos',
      populate: [
        {
          path: 'badges',
          select: 'name icon color',
        },
        {
          path: 'launcher',
          select: 'name photo',
        },
        {
          path: 'topPhotos',
          select: 'data',
        },
        {
          path: 'representation',
          select: 'content emojis',
        },
      ],
    });
    const userMeetups = meetupAndUserRelationships.map((relationship) => {
      return relationship.meetup;
    });

    response.status(200).json({
      userMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetup = async (request, response) => {
  try {
    const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({
      meetup: request.params.meetupId,
    }).populate({
      path: 'meetup',
      select: 'title startDateAndTime launcher badges',
      populate: [
        {
          path: 'launcher',
          select: 'name photo',
        },
        {
          path: 'badges',
          select: 'name icon color',
        },
      ],
    });

    response.status(200).json({
      meetup: meetupAndUserRelationship.meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetupAttendees = async (request, response) => {
  try {
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      meetup: request.params.meetupId,
    }).populate({
      path: 'user',
      select: 'name topBadges photo',
      populate: {
        path: 'topBadges',
        populate: {
          path: 'badge',
          select: 'icon color name',
          populate: {
            path: 'icon',
            model: Icon,
            select: 'url',
          },
        },
      },
    });

    const meetupAttendees = meetupAndUserRelationships.map((relationship) => {
      return {
        user: relationship.user,
        rsvp: relationship.rsvp,
        launcher: relationship.launcher,
      };
    });

    response.status(200).json({
      meetupAttendees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyUpcomingMeetups = async (request, response) => {
  try {
    const myUpcomingMeetups = {};
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'meetup',
      select: '_id title startDateAndTime state launcher place fee',
    });
    // .populate({
    //   path: 'meetup',
    //   select: '_id title startDateAndTime state launcher',
    // });
    // ない場合はこの操作をやってはいかんのね。
    if (meetupAndUserRelationships.length) {
      const myUpcomingMeetupAndUserRelationships = meetupAndUserRelationships.filter(
        (relationship) => relationship.meetup.state !== 'finished'
      );

      const myUpcomingMeetupsArr = myUpcomingMeetupAndUserRelationships.map((relationship) => relationship.meetup);

      myUpcomingMeetupAndUserRelationships.forEach((relationship) => {
        myUpcomingMeetups[relationship.meetup._id] = {
          _id: relationship.meetup._id,
          title: relationship.meetup.title,
          startDateAndTime: relationship.meetup.startDateAndTime,
          state: relationship.meetup.state,
          launcher: relationship.meetup.launcher,
          place: relationship.meetup.place,
          fee: relationship.meetup.fee,
          isRSVPed: relationship.rsvp,
        };
      });
    }

    response.status(200).json({
      myUpcomingMeetups,
      // meetupAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyMeetupStates = async (request, response) => {
  try {
    const { upcomingMeetupIds, userId } = request.body;
    const myUpcomingMeetups = {};
    const alreadyFinishedMeetups = {};
    const meetups = await Meetup.find({ _id: { $in: upcomingMeetupIds } });
    meetups.forEach((meetup) => {
      if (meetup.state !== 'finished') {
        myUpcomingMeetups[meetup._id] = {
          _id: meetup._id,
          title: meetup.title,
          startDateAndTime: meetup.startDateAndTime,
          state: meetup.state,
          launcher: meetup.launcher,
          place: meetup.place,
        };
      } else {
        alreadyFinishedMeetups[meetup._id] = true;
      }
    });

    // if (Object.values(alreadyFinishedMeetups).length) {
    //   const user = await User.findById(userId);
    //   user.upcomingMeetups.forEach((meetup) => {
    //     // 配列から除く。めんどいから後で。
    //   })
    // }

    response.status(200).json({
      myUpcomingMeetups,
    });
    // const meetupAndUserRelationship = await MeetupAndUserRelationship.find(queryConditon);
  } catch (error) {
    console.log(error);
  }
};

export const updateViewedChatsLastTime = async (request, response) => {
  try {
    const { meetupId, userId } = request.params;
    const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({ meetup: meetupId, user: userId });
    meetupAndUserRelationship.viewedChatsLastTime = new Date();
    meetupAndUserRelationship.save();
    console.log('updated', meetupAndUserRelationship);

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkRSVPState = async (request, response) => {
  const { meetupId, userId } = request.params;
  const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({ meetup: meetupId, user: userId });
  response.status(200).json({
    rsvp: meetupAndUserRelationship.rsvp,
  });
};

export const rsvp = async (request, response) => {
  try {
    const { meetupId, userId } = request.params;
    const { meetup, user, launcherId } = request.body;
    const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({ meetup: meetup._id, user: user._id });
    meetupAndUserRelationship.rsvp = true;
    meetupAndUserRelationship.save();
    if (launcherId) {
      const launcher = await User.findById(launcherId);
      const notificationMessage = {
        to: launcher.pushToken,
        data: { notificationType: 'rsvped' },
        title: `${user.name} rsvped ${meetup.title}`,
      };
      sendPushNotification(launcher.pushToken, notificationMessage);
    }

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelRSVP = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const sendStartNotification = async (request, response) => {
  try {
    const { meetupId } = request.body;
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({ meetup: meetupId, rsvp: true })
      .populate({ path: 'user' })
      .select({ pushToken: 1 });

    const pushTokens = [];

    meetupAndUserRelationships.forEach((rel) => {
      if (rel.user) {
        pushTokens.push(rel.user.pushToken);
      }
    });

    const chunks = expo.chunkPushNotifications(
      pushTokens.map((token) => ({
        to: token,
        sound: 'default',
        data: { notificationType: 'startMeetup' },
        title: 'Meetup started now 🔥',
        body: 'Enjoy your time!',
      }))
    );

    const tickets = [];

    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...receipts);
        console.log('Push notifications sent:', receipts);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
    response.status(200).json({
      message: 'sent',
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendFinishNotification = async (request, response) => {
  try {
    const { meetupId } = request.body;
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({ meetup: meetupId, rsvp: true })
      .populate({ path: 'user' })
      .select({ pushToken: 1 });

    const pushTokens = [];
    meetupAndUserRelationships.forEach((rel) => {
      if (rel.user) {
        pushTokens.push(rel.user.pushToken);
      }
    });

    const chunks = expo.chunkPushNotifications(
      pushTokens.map((token) => ({
        to: token,
        sound: 'default',
        data: { notificationType: 'meetupHasEnded', meetupId },
        title: 'Your meetup has ended.',
        body: "The meetup has finished. Now you can check your log. Let's connect with friends and share your impression.",
      }))
    );

    const tickets = [];

    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...receipts);
        console.log('Push notifications sent:', receipts);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
    response.status(200).json({
      message: 'sent',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserMeetupsByYearMonth = async (request, response) => {
  try {
    const { yearAndMonth } = request.query;
    const year = yearAndMonth.split('-')[0];
    const month = yearAndMonth.split('-')[1];
    console.log(yearAndMonth, year, month);

    const startDate = new Date(Date.UTC(year, month - 1, 1));
    const endDate = new Date(Date.UTC(year, month, 1));

    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      user: request.params.userId,
      rsvp: true,
      createdAt: { $gte: startDate, $lt: endDate },
    }).populate({
      path: 'meetup',
      select: 'badges _id',
      populate: {
        path: 'badges',
        select: 'icon color',
        populate: {
          path: 'icon',
        },
      },
    });
    console.log(meetupAndUserRelationships);

    response.status(200).json({
      meetupAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserMeetupsByDate = async (request, response) => {
  try {
    const { datestring } = request.query;
    const year = datestring.split('-')[0];
    const month = datestring.split('-')[1];
    const day = datestring.split('-')[2];
    console.log(year, month, day);
    const startDate = new Date(Date.UTC(year, month - 1, day, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
    console.log(startDate, endDate);
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      user: request.params.userId,
      rsvp: true,
      createdAt: { $gte: startDate, $lt: endDate },
    })
      .populate({
        path: 'meetup',
        select: 'title badges launcher',
        populate: {
          path: 'badges',
          select: 'icon _id name color',
          populate: {
            path: 'icon',
          },
        },
      })
      .populate({
        path: 'impression',
      });
    console.log(meetupAndUserRelationships);

    response.status(200).json({
      meetupAndUserRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
