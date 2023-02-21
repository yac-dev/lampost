import MeetupAndUserRelationship from '../models/meetupAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';

export const joinMeetup = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    const meetupAndUserRelationship = await MeetupAndUserRelationship.create({
      meetup: meetupId,
      user: userId,
    });
    // ここ、いちいちqueryするの、めんどいよね。totalAttendeesだけを変えるだけだから、別にいらないかも。
    const meetup = await Meetup.findById(meetupId);
    meetup.totalAttendees++;
    // meetup.attendees.push(request.body.userId);
    meetup.save();
    const user = await User.findById(request.body.userId);
    const meetupObj = {
      meetup: meetup._id,
      viewedChatsLastTime: new Date(),
    };
    user.upcomingMeetups.push(meetupObj);
    user.save();

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
      },
      totalAttendees: meetup.totalAttendees,
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
      if (user.upcomingMeetups[i].meetup === meetupId) {
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
      totalAttendees: meetup.totalAttendees,
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
      select: 'title startDateAndTime state totalAttendees',
      populate: {
        path: 'badges',
        select: 'name icon color',
      },
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
    //
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
      return relationship.user;
    });

    response.status(200).json({
      meetupAttendees,
    });
  } catch (error) {
    console.log(error);
  }
};
