import MeetupAndUserRelationship from '../models/meetupAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';
import UserBadgeExperience from '../models/userBadgeExperience';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';

export const joinMeetup = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    const meetupAndUserRelationship = await MeetupAndUserRelationship.create({
      meetup: meetupId,
      user: userId,
      launcher: false,
      viewedChatsLastTime: new Date(),
      rsvp: false,
    });
    // ここ、いちいちqueryするの、めんどいよね。totalAttendeesだけを変えるだけだから、別にいらないかも。
    const meetup = await Meetup.findById(meetupId);
    meetup.totalAttendees++;
    meetup.save();
    const user = await User.findById(request.body.userId);
    // const meetupObj = {
    //   meetup: meetup._id,
    //   viewedChatsLastTime: new Date(),
    // };
    user.upcomingMeetups.push(meetupId);
    user.save();

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
    const user = await User.findById(userId);
    let indexOfMeetup = 0;
    for (let i = 0; i < user.upcomingMeetups.length; i++) {
      if (user.upcomingMeetups[i] === meetupId) {
        indexOfMeetup = i;
      }
    }
    // const indexOfMeetup = user.upcomingMeetups.indexOf(meetup._id);
    if (indexOfMeetup > -1) {
      user.upcomingMeetups.splice(indexOfMeetup, 1);
    }
    user.save();
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
      select: 'title startDateAndTime state launcher badges',
      populate: [
        {
          path: 'badges',
          select: 'name icon color',
        },
        {
          path: 'launcher',
          select: 'name photo',
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
        select: 'name color icon',
      },
    });

    const meetupAttendees = meetupAndUserRelationships.map((relationship) => {
      return {
        user: relationship.user,
        rsvp: relationship.rsvp,
      };
    });

    response.status(200).json({
      meetupAttendees,
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
    const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({ meetup: meetupId, user: userId });
    meetupAndUserRelationship.rsvp = true;
    meetupAndUserRelationship.save();
    const meetup = await Meetup.findById(meetupId).select({ badges: 1 });
    const badgeAndUserTable = meetup.badges.map((badgeId) => {
      return {
        badge: badgeId,
        user: userId,
      };
    });
    // [{badge: 2, user: 3, badge: 4, user:3, badge: 10, user: 3}] // これに一致するbadgeAndUserRelationshipを一つずつ見つけて、それを+10upvotteする感じか。その後に、userBadgePassionのmodelも作っていく感じか。
    for (const table of badgeAndUserTable) {
      const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({ badge: table.badge, user: table.user });
      if (badgeAndUserRelationship) {
        badgeAndUserRelationship.totalExperience = badgeAndUserRelationship.totalExperience + 10;
        await badgeAndUserRelationship.save();
        const userBadgeExperience = await UserBadgeExperience.create({
          badgeAndUserRelationship: badgeAndUserRelationship._id,
          type: 'meetupRSVP',
          experience: 10,
        });
      }
    }

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
