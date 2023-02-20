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
    response.status(201).json({});
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
    const meetupAndUserRelationship = await Meetup.deleteOne({ meetup: meetupId, user: userId });
    console.log(meetup.attendees, 'removing this index', indexOfUser);
    meetup.totalAttendees--;
    meetup.save();
    const user = await User.findById(userId);
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

export const getUserMeetups = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    // meetupをqueryして、かつtitleとstartDateAndTimeとassetsを取ってくる感じかな。まあ、最初はtitleとstartDateAndTimeだけでいい。
    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({
      meetup: meetupId,
      user: userId,
    }).populate({
      path: 'meetup',
      select: 'title startDateAndTime state totalAttendees',
    });
    const meetups = meetupAndUserRelationships.map((relationship) => {
      return relationship.meetup;
    });

    response.status(200).json({
      meetups,
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
