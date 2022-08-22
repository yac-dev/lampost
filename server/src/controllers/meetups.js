import Meetup from '../models/meetup';

export const createMeetup = async (request, response) => {
  try {
    const { place, title, genres, startDateAndTime, endDateAndTime, isFree, currency, fee, isPublic, host } =
      request.body;
    console.log('requestes');
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
