import Meetup from '../models/meetup';

export const createMeetup = async (request, response) => {
  try {
    const { place, title, genres, startDateAndTime, endDateAndTime, isFree, currency, fee, isPublic, host } =
      request.body;
    const meetup = new Meetup({
      place,
      title,
      genres,
      startDateAndTime,
      endDateAndTime,
      isPublic,
      host,
    });

    if (!isFree) {
      meetup.currency = currency;
      meetup.fee = fee;
    }

    meetup.save();

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
        path: 'genres',
        model: 'MeetupGenre',
      })
      .populate({
        path: 'host',
        model: 'User',
      })
      .populate({
        path: 'attendees',
        model: 'User',
      });
    response.status(200).json({
      meetups,
    });
  } catch (error) {
    console.log(error);
  }
};
