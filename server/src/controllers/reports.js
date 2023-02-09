import ReportRelationshipBetweenMeetupAndUser from '../models/reportRelationshipBetweenMeetupAndUser.js';

export const reportMeetup = async (request, response) => {
  try {
    const { meetupId, userId, issue } = request.body;
    const reportRelationshipBetweenMeetupAndUser = await ReportRelationshipBetweenMeetupAndUser.create({
      meetup: meetupId,
      user: userId,
      issue: issue,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
