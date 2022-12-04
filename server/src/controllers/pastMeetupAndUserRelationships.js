import PastMeetupAndUserRelationship from '../models/pastMeetupAndUserRelationship';

export const getPastMeetupsByUserId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationships = await PastMeetupAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'pastMeetup',
      select: 'assets attendees badges startDateAndTime launcher place title',
      populate: [
        {
          path: 'launcher',
          select: 'name photo _id',
        },
        {
          path: 'assets',
        },
        {
          path: 'badges',
          select: 'color icon name',
        },
      ],
    });
    const pastMeetups = pastMeetupAndUserRelationships.map((pastMeetupAndUserRelationship) => {
      return pastMeetupAndUserRelationship.pastMeetup;
    });

    response.status(200).json({
      pastMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};
