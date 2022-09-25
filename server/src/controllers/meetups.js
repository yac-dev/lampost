import Meetup from '../models/meetup';
import User from '../models/user';
import Chat from '../models/chat';
import schedule from 'node-schedule';

// この二つも、さらに一つのfunctionにまとめるべき。後で。
const scheduleStartMeetup = async (startDateAndTime, meetupId) => {
  schedule.scheduleJob(new Date(startDateAndTime), async () => {
    // まず、ここでdeleteされたかの確認。
    const meetup = await Meetup.findById(meetupId);
    // deleteあsれてなければ
    if (meetup) {
      //updateされたかの確認。あとは、recursion
      if (meetup.isStartDateAndTimeUpdated) {
        scheduleStartMeetup(meetup.startDateAndTime, meetup._id);
      } else {
        meetup.state = 'started';
        console.log('started schedulte');
        meetup.save();
        return;
      }
    }
    // deleteされていれば、なんも動かさない。
    else {
      console.log('deleted...');
    }
  });
};

const scheduleEndMeetup = async (endDateAndTime, meetupId) => {
  schedule.scheduleJob(new Date(endDateAndTime), async () => {
    // まず、ここでdeleteされたかの確認。
    const meetup = await Meetup.findById(meetupId);
    // deleteあsれてなければ
    if (meetup) {
      //updateされたかの確認。あとは、recursion
      if (meetup.isEndDateAndTimeUpdated) {
        scheduleStartMeetup(meetup.endDateAndTime, meetup._id);
      } else {
        meetup.state = 'end';
        console.log('finished schedule');
        meetup.save();
        return;
      }
    }
    // deleteされていれば、なんも動かさない。
    else {
      console.log('deleted...');
    }
  });
};

export const createMeetup = async (request, response) => {
  try {
    const {
      place,
      badges,
      title,
      startDateAndTime,
      endDateAndTime,
      isMeetupAttendeesLimitFree,
      meetupAttendeesLimit,
      isMeetupFeeFree,
      currency,
      fee,
      description,
      isPublic,
      launcher,
    } = request.body;

    const meetup = new Meetup({
      place,
      badges,
      title,
      startDateAndTime,
      endDateAndTime,
      isPublic,
      description,
      launcher,
    });

    if (!isMeetupFeeFree) {
      meetup.currency = currency;
      meetup.fee = fee;
    }

    if (!isMeetupAttendeesLimitFree) {
      meetup.attendeesLimit = meetupAttendeesLimit;
    }

    const user = await User.findById(launcher);
    user.upcomingLaunchedMeetups.push(meetup._id);
    user.upcomingJoinedMeetups.push(meetup._id);
    user.save();

    meetup.attendees.push(launcher);
    meetup.save();

    scheduleStartMeetup(meetup.startDateAndTime, meetup._id);
    scheduleEndMeetup(meetup.endDateAndTime, meetup._id);

    response.status(201).json({
      meetup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetups = async (request, response) => {
  try {
    const meetups = await Meetup.find()
      .populate({
        path: 'launcher',
        model: User,
        select: 'name photo',
      })
      .populate({
        path: 'attendees',
        model: User,
        select: 'name photo',
      });
    response.status(200).json({
      meetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingJoinedMeetups = async (request, response) => {
  try {
    // meetupのidは、arrayで全部もっている。それで検索かければいい。
    const { upcomingJoinedMeetupIds } = request.body;
    console.log(upcomingJoinedMeetupIds);
    const upcomingJoinedMeetups = await Meetup.find({ _id: { $in: upcomingJoinedMeetupIds } }).select({
      _id: 1,

      host: 1,
      startDateAndTime: 1,
      state: 1,
      endDateAndTime: 1,
    });
    response.status(200).json({
      upcomingJoinedMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id)
      .populate({
        path: 'attendees',
        model: User,
      })
      .populate({
        path: 'chats',
        model: Chat,
        populate: {
          path: 'user',
          model: User,
          select: 'name _id',
        },
      });
    console.log(meetup);
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
    meetup.attendees.push(request.body.user);
    meetup.save();
    response.status(200).json({
      meetup,
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
