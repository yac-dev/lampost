import Meetup from '../models/meetup';

export const createMeetup = async (request, response) => {
  try {
    const meetup = await Meetup.create({});
    response.status(201).json({
      meetup,
    });
  } catch (error) {
    console.log(error);
  }
};
