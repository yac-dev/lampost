import Meetup from '../models/meetup';
import User from '../models/user';
import Chat from '../models/chat';
import ChatRoom from '../models/chatRoom';
import Badge from '../models/badge';
import Comment from '../models/comment';
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
        meetup.state = 'ongoing';
        console.log('meetup started');
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

    const meetup = new Meetup({
      place,
      badges,
      // preferredBadges,
      title,
      startDateAndTime,
      duration,
      applicationDeadline,
      description,
      link,
      launcher,
      createdAt: new Date(),
      // endDateAndTime,
    });

    console.log(request.body);

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
    const pushing = {
      meetup: meetup._id,
      viewedChatsLastTime: new Date(),
    };
    user.upcomingMeetups.push(pushing);
    user.save();

    // chatroom作成。
    const chatRoom = new ChatRoom({
      createdAt: new Date(),
    });
    chatRoom.members.push(user._id);
    chatRoom.save();

    meetup.attendees.push(launcher);
    meetup.chatRoom = chatRoom._id;
    meetup.save();
    const badge = await Badge.findById(badges[0]);

    // scheduleStartMeetup(meetup.startDateAndTime, meetup._id);
    // scheduleEndMeetup(meetup.endDateAndTime, meetup._id);

    // const populatingBadges = await Badge.find({ _id: { $in: badges } });

    response.status(201).json({
      meetup: {
        _id: meetup._id,
        place: meetup.place,
        title: meetup.title,
        startDateAndTime: meetup.startDateAndTime,
        badge: {
          _id: badge._id,
          icon: badge.icon,
          color: badge.color,
        },
        // startDateAndTime: meetup.startDateAndTime,
        // badges: populatingBadges,
      },
      viewedChatsLastTime: new Date(),
      // badge: {
      //   icon: badge.icon,
      // }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetups = async (request, response) => {
  try {
    const meetups = await Meetup.find()
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
        select: 'name photo',
      })
      .populate({
        path: 'badges',
        model: Badge,
      })
      .populate({
        path: 'comments',
      });
    console.log('meetup selected!', meetup);
    response.status(200).json({
      meetup,
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
        path: 'chatRoom',
        model: ChatRoom,
        populate: {
          path: 'chats',
          model: Chat,
          populate: {
            path: 'user',
            model: User,
            select: 'name _id',
          },
        },
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
    const meetup = await Meetup.findById(request.params.id).select({ attendees: 1 }).populate({
      path: 'attendees',
      model: User,
      select: 'name photo badges',
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
    const meetup = await Meetup.findById(request.params.id).populate({
      path: 'attendees',
      model: User,
    });
    meetup.attendees.push(request.body.user);
    meetup.save();
    const user = await User.findById(request.body.user);
    const meetupObj = {
      meetup: meetup._id,
      viewedChatsLastTime: new Date(),
    };
    user.upcomingMeetups.push(meetupObj);
    user.save();
    response.status(200).json({
      id: meetup._id,
      attendees: meetup.attendees,
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.findById(request.params.id).populate({
      path: 'attendees',
      model: User,
    });
    const indexOfUser = meetup.attendees.map((element) => element._id).indexOf(request.body.user);
    if (indexOfUser > -1) {
      meetup.attendees.splice(indexOfUser, 1);
    }
    meetup.save();
    const user = await User.findById(request.body.user);
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
      id: meetup._id,
      attendees: meetup.attendees,
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
