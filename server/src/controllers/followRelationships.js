import FollowRelationship from '../models/followRelationship';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

export const createFollowRelationship = async (request, response) => {
  try {
    const { user, followeeId } = request.body;
    const followRelationship = await FollowRelationship.create({
      followee: followeeId,
      follower: user._id,
      createdAt: new Date(),
    });

    const launcher = await User.findById(followeeId);
    launcher.fame = launcher.fame + 10;
    launcher.save();

    const notificationMessage = {
      to: launcher.pushToken,
      data: { notificationType: 'patronRelationship' },
      title: `${user.name} started following you.`,
      // body: `"${content}" from ${user.name}`,
    };

    sendPushNotification(launcher.pushToken, notificationMessage);

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
    const pushTokens = [];
    followRelationships.forEach((rel) => {
      if (rel.user) {
        pushTokens.push(rel.follower.pushToken);
      }
    });
    const chunks = expo.chunkPushNotifications(
      pushTokens.map((token) => ({
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

export const isFollowing = async (request, response) => {
  try {
    const followRelationship = await FollowRelationship.findOne({
      followee: request.params.followeeId,
      follower: request.params.followerId,
    });
    let isFollowing = false;
    if (followRelationship) {
      isFollowing = true;
    }
    response.status(200).json({
      isFollowing,
    });
  } catch (error) {
    console.log(error);
  }
};
