import LoungeChat from '../models/loungeChat';
import Meetup from '../models/meetup';

export const getMyLoungeChats = async (request, response) => {
  try {
    const { upcomingMeetupIds } = request.body;
    const myUpcomingmeetups = await Meetup.find({ _id: { $in: upcomingMeetupIds } }).select({
      title: 1,
      startDateAndTime: 1,
    });
    const myUpcomingMeetupsTable = {};
    for (let i = 0; i < myUpcomingmeetups.length; i++) {
      myUpcomingMeetupsTable[myUpcomingmeetups[i]._id] = {
        _id: myUpcomingmeetups[i]._id,
        title: myUpcomingmeetups[i].title,
        startDateAndTime: myUpcomingmeetups[i].startDateAndTime,
        chats: [],
      };
    }
    const loungeChats = await LoungeChat.find({ meetup: { $in: upcomingMeetupIds } });
    for (let i = 0; i < loungeChats.length; i++) {
      myUpcomingMeetupsTable[loungeChats[i].meetup]['chats'].push(loungeChats[i]);
    }
    response.status(200).json({
      myUpcomingMeetupsTable,
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
