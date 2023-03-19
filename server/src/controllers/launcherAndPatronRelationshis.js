import LauncherAndPatronRelationship from '../models/launcherAndPatronRelationship';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';

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
