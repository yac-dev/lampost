import PastMeetupAndUserRelationship from '../models/pastMeetupAndUserRelationship';

export const getPastMeetupsByUserId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationships = await PastMeetupAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'pastMeetup',
      populate: [
        {
          path: 'launcher',
        },
        {
          path: 'assets',
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
