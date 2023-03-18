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
    const { meetupId, user, content, emojis, launcherId } = request.body;
    const impression = await Impression.create({
      meetup: meetupId,
      user: user._id,
      content,
      emojis,
      createdAt: Date.now(),
    });
    // 1, launcherのfameを上げる。
    const emojisMultiple = emojis.length ? emojis.length : 1;
    const launcher = await User.findById(launcherId);
    const upvote = 3 * emojisMultiple;
    launcher.fame = launcher.fame + upvote;
    launcher.save();
    // 2, launcherにnotificationを送る。
    const notificationMessage = {
      to: launcher.pushToken,
      data: { notificationType: 'sentImpression' },
      title: 'Your meetup member wrote an impression🔥',
      body: `"${content}" from ${user.name}`,
    };
    sendPushNotification(launcher.pushToken, notificationMessage);
    // 3, 書いたmemberのbadge experienceを上げる。
    const meetup = await Meetup.findById(meetupId);
    const badgeAndUserTable = meetup.badges.map((badgeId) => {
      return {
        badge: badgeId,
        user: user._id,
      };
    });
    for (const table of badgeAndUserTable) {
      const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({ badge: table.badge, user: table.user });
      if (badgeAndUserRelationship) {
        badgeAndUserRelationship.totalExperience = badgeAndUserRelationship.totalExperience + 3;
        await badgeAndUserRelationship.save();
        const userBadgeExperience = await UserBadgeExperience.create({
          badgeAndUserRelationship: badgeAndUserRelationship._id,
          type: 'meetupImpression',
          experience: 3,
        });
      }
    }

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
    const membersPushTokens = meetupAndUserRelationships.map((rel) => {
      return rel.user.pushToken;
    });
    // const membersPushTokens = meetupMembers.map((user) => {
    //   return user.pushToken;
    // });

    console.log(membersPushTokens);

    const chunks = expo.chunkPushNotifications(
      membersPushTokens.map((token) => ({
        to: token,
        sound: 'default',
        data: { notificationType: 'sentImpression' },
        title: 'Launcher wrote an impression',
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
