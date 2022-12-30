import LoungeChat from '../models/loungeChat';
import Meetup from '../models/meetup';

export const getMyLoungeChats = async (request, response) => {
  try {
    const myUpcomingMeetupAndChatsTable = {};
    const { myUpcomingMeetups } = request.body;
    for (let i = 0; i < myUpcomingMeetups.length; i++) {
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup] = {};
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup]._id = myUpcomingMeetups[i].meetup;
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup].viewedChatsLastTime =
        myUpcomingMeetups[i].viewedChatsLastTime;
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup].unreadChatsCount = 0;
    }
    const upcomingMeetupIds = myUpcomingMeetups.map((meetupObject) => {
      return meetupObject.meetup;
    });

    const meetups = await Meetup.find({ _id: { $in: upcomingMeetupIds } }).select({
      title: 1,
      startDateAndTime: 1,
    });
    // [{_id: 111, title: '', startDateAndTime: 2022/9/1}, {_id: 222, title: '', startDateAndTime: 2022/8/1}]
    // {
    //  111: { _id: 111, title: '', startDateAndTime: 2022/9/1, chats: [], viewedChatsLastTime: '' },
    //  222: { _id: 222, title: '', startDateAndTime: 2022/8/1, chats: [], viewedChatsLastTime: '' }
    // }
    for (let i = 0; i < meetups.length; i++) {
      myUpcomingMeetupAndChatsTable[meetups[i]._id].title = meetups[i].title;
      myUpcomingMeetupAndChatsTable[meetups[i]._id].startDateAndTime = meetups[i].startDateAndTime;
      // myUpcomingMeetupAndChatsTable[meetups[i]._id].chats = [];
    }
    const loungeChats = await LoungeChat.find({ meetup: { $in: upcomingMeetupIds } });
    for (let i = 0; i < loungeChats.length; i++) {
      // myUpcomingMeetupAndChatsTable[loungeChats[i].meetup]['chats'].push(loungeChats[i]);
      if (
        new Date(myUpcomingMeetupAndChatsTable[loungeChats[i].meetup].viewedChatsLastTime) <
        new Date(loungeChats[i].createdAt)
      ) {
        myUpcomingMeetupAndChatsTable[loungeChats[i].meetup].unreadChatsCount++;
        // myUpcomingMeetupAndChatsTable['totalUnreadChatsCount']++;
      }
    }
    response.status(200).json({
      myUpcomingMeetupAndChatsTable,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedMeetupLoungeChats = async (request, response) => {
  try {
    const loungeChats = await LoungeChat.find({ meetup: request.params.meetupId }).populate({
      path: 'user',
      select: 'name photo',
    });
    response.status(200).json({
      loungeChats,
    });
  } catch (error) {
    console.log(error);
  }
};
