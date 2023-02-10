import ReportRelationshipBetweenMeetupAndUser from '../models/reportRelationshipBetweenMeetupAndUser.js';
import ReportMeetupMember from '../models/reportMeetupMember.js';

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

export const reportMeetupMember = async (request, response) => {
  try {
    const { meetupId, userId, reportedUserId, issue, description } = request.body;
    const reportMeetupMember = await ReportMeetupMember.create({
      meetup: meetupId,
      user: userId,
      reportedUser: reportedUserId,
      issue,
      description,
    });
    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
