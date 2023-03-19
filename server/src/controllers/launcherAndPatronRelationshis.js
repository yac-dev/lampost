import LauncherAndPatronRelationship from '../models/launcherAndPatronRelationship';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';

export const createLauncherAndPatronRelationship = async (request, response) => {
  try {
    const { launcherId, patron } = request.body;
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.create({
      launcher: launcherId,
      patron: patron._id,
    });

    const launcher = await User.findById(launcherId);
    launcher.fame = launcher.fame + 10;
    launcher.save();

    const notificationMessage = {
      to: launcher.pushToken,
      data: { notificationType: 'patronRelationship' },
      title: `${patron.name} started supportig you.`,
      // body: `"${content}" from ${user.name}`,
    };

    sendPushNotification(launcher.pushToken, notificationMessage);

    response.status(200).json({
      patron: patron,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyLeadersByUserId = async (request, response) => {
  try {
    const o = 0;
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
