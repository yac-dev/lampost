import Impression from '../models/impression';
import User from '../models/user';
import Meetup from '../models/meetup';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import UserBadgeExperience from '../models/userBadgeExperience';
import { sendPushNotification } from '../services/expo-push-sdk';
import MeetupAndUserRelationship from '../models/meetupAndUserRelationship';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

// impressionを書くのと同時に、meetup launcherのfameを3 * emojiのlength分上げて、かつimpressionを書いたmemberのbadgeのexperienceを3づつあげる。
export const createImpressionByMember = async (request, response) => {
  try {
    const { meetupId, user, content, emojis, launcherId, totalPoint } = request.body;
    const impression = await Impression.create({
      meetup: meetupId,
      user: user._id,
      content,
      emojis,
      createdAt: Date.now(),
    });
    if (launcherId) {
      const launcher = await User.findById(launcherId);
      // launcherが蒸発している場合がある。
      launcher.fame = launcher.fame + totalPoint;
      launcher.save();
      // 2, launcherにnotificationを送る。
      const notificationMessage = {
        to: launcher.pushToken,
        data: { notificationType: 'sentImpression' },
        title: `${user.name} wrote an impression 🔥`,
        body: content,
      };
      sendPushNotification(launcher.pushToken, notificationMessage);
    }
    const meetupAndUserRelationship = await MeetupAndUserRelationship.findOne({ meetup: meetupId, user: user._id });
    meetupAndUserRelationship.impression = impression._id;
    meetupAndUserRelationship.save();

    response.status(201).json({
      impression: {
        _id: impression._id,
        user,
        content: impression.content,
        emojis: impression.emojis,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createImpressionByLauncher = async (request, response) => {
  try {
    const { meetupId, user, content, emojis, launcherId } = request.body;
    const impression = await Impression.create({
      meetup: meetupId,
      user: user._id,
      content,
      emojis,
      createdAt: Date.now(),
    });

    const meetupAndUserRelationships = await MeetupAndUserRelationship.find({ meetup: meetupId, rsvp: true })
      .populate({ path: 'user' })
      .select({ pushToken: 1 });
    // ここ、削除されたuserの部分をskipするようにせんといかん。な。
    const pushTokens = [];
    meetupAndUserRelationships.forEach((rel) => {
      if (rel.user) {
        pushTokens.push(rel.user.pushToken);
      }
    });
    // const membersPushTokens = meetupMembers.map((user) => {
    //   return user.pushToken;
    // });
    const chunks = expo.chunkPushNotifications(
      pushTokens.map((token) => ({
        to: token,
        sound: 'default',
        data: { notificationType: 'sentImpression' },
        title: 'Launcher wrote an impression 🔥',
        body: content,
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

    response.status(201).json({
      impression: {
        _id: impression._id,
        user,
        content: impression.content,
        emojis: impression.emojis,
        createdAt: impression.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getImpressions = async (request, response) => {
  try {
    const impressions = await Impression.find({ meetup: request.params.meetupId }).populate({
      path: 'user',
      select: 'name photo',
    });
    response.status(200).json({
      impressions,
    });
  } catch (error) {
    console.log(error);
  }
};
