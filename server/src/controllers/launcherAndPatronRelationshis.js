import LauncherAndPatronRelationship from '../models/launcherAndPatronRelationship';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

export const createLauncherAndPatronRelationship = async (request, response) => {
  try {
    const { launcherId, user } = request.body;
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.create({
      launcher: launcherId,
      patron: user._id,
      createdAt: Date.now(),
    });

    const launcher = await User.findById(launcherId);
    launcher.fame = launcher.fame + 10;
    launcher.save();

    const notificationMessage = {
      to: launcher.pushToken,
      data: { notificationType: 'patronRelationship' },
      title: `${user.name} started supporting you🤝`,
      // body: `"${content}" from ${user.name}`,
    };

    sendPushNotification(launcher.pushToken, notificationMessage);

    response.status(200).json({
      launcher: launcherId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyLaunchersByUserId = async (request, response) => {
  try {
    const launcherAndPatronRelationships = await LauncherAndPatronRelationship.find({ patron: request.params.userId });
    const launcherIds = launcherAndPatronRelationships.map((relationship) => {
      return relationship.launcher;
    });
    response.status(200).json({
      launcherIds,
    });
  } catch (error) {
    console.log(error);
  }
};

export const isSupportingLauncher = async (request, response) => {
  try {
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.findOne({
      launcher: request.params.launcherId,
      patron: request.params.patronId,
    });
    let isSupporting = false;
    if (launcherAndPatronRelationship) {
      isSupporting = true;
    }
    response.status(200).json({
      isSupporting,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPatronsByLauncherId = async (request, response) => {
  try {
    const { launcherId } = request.params;
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.find({
      launcher: launcherId,
    }).populate({
      path: 'patron',
      select: 'name photo',
    });

    const patrons = launcherAndPatronRelationship.map((relationship) => {
      return relationship.patron;
    });
    response.status(200).json({
      patrons,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendLaunchNotificationsToPatrons = async (request, response) => {
  try {
    const { launcher, description } = request.body;
    const meetupAndUserRelationships = await LauncherAndPatronRelationship.find({ launcher: launcher._id })
      .populate({ path: 'patron' })
      .select({ pushToken: 1 });
    const membersPushTokens = meetupAndUserRelationships.map((rel) => {
      return rel.patron.pushToken;
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
