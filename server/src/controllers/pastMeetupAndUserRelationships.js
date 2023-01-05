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

export const getLaunchedMeetupsByLauncherId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationships = await PastMeetupAndUserRelationship.find({
      launcher: request.params.launcherId,
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

    const launchedMeetups = pastMeetupAndUserRelationships.map((pastMeetupAndUserRelationship) => {
      return {
        meetup: pastMeetupAndUserRelationship.pastMeetup,
        representation: pastMeetupAndUserRelationship.representation,
        totalImpressions: pastMeetupAndUserRelationship.impressions.length,
      };
    });
    console.log(launchedMeetups);
    response.status(200).json({
      launchedMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};
