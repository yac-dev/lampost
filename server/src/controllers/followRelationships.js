import FollowRelationship from '../models/followRelationship';
import { sendPushNotification } from '../services/expo-push-sdk';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

export const createFollowRelationship = async (request, response) => {
  try {
    const { followerId, followeeId } = request.body;
    const followRelationship = await FollowRelationship.create({
      followee: followeeId,
      follower: followerId,
      createdAt: new Date(),
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendMeetupLaunchNotificationToFollowers = async (request, response) => {
  try {
    const { launcher, description } = request.body;
    const followRelationships = await FollowRelationship.find({ launcher: launcher._id })
      .populate({ path: 'follower' })
      .select({ pushToken: 1 });
    const membersPushTokens = followRelationships.map((rel) => {
      return rel.follower.pushToken;
    });
    const chunks = expo.chunkPushNotifications(
      membersPushTokens.map((token) => ({
        to: token,
        sound: 'default',
        data: { notificationType: 'launchedhMeetup' },
        title: `${launcher.name} launched a new meetup`,
        body: description,
      }))
    );
    const tickets = [];
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...receipts);
        console.log('Push notifications sent:', receipts);
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    }
    response.status(200).json({
      message: 'sent',
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
