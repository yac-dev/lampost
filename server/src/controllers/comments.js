import Comment from '../models/comment';
import Meetup from '../models/meetup';
import User from '../models/user';
import { sendPushNotification } from '../services/expo-push-sdk';

export const createQuestion = async (request, response) => {
  try {
    const { meetupId, user, content, replyingTo, launcherId } = request.body;
    const comment = await Comment.create({
      meetup: meetupId,
      user: user._id,
      content,
      replyTo: replyingTo._id,
      createdAt: new Date(),
    });

    // notificationを送る。
    // if (launcherId) {
    //   const launcher = await User.findById(launcherId);
    //   const message = {
    //     to: launcher.pushToken,
    //     data: { notificationType: 'comment', meetupId },
    //     title: 'Someone asked about your meetup.',
    //     body: content,
    //   };
    //   sendPushNotification(launcher.pushToken, message); // ここで、laucher、もしくはattendeesにchatを送るようにする。
    // }

    response.status(201).json({
      comment: {
        content: comment.content,
        user: {
          _id: user._id,
          name: user.name,
          photo: user.photo,
        },
        createdAt: comment.createdAt,
        replyingTo: replyingTo,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetupComments = async (request, response) => {
  try {
    const comments = await Comment.find({ meetup: request.params.meetupId }).populate([
      {
        path: 'user',
        select: 'name photo',
      },
      {
        path: 'replyTo',
        populate: {
          path: 'user',
          select: 'name photo',
        },
      },
    ]);
    response.status(200).json({
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createReply = async (request, response) => {
  try {
    const { meetupId, userId, content } = request.body;
    const reply = await Comment.create({
      meetup: meetupId,
      user: userId,
      content,
      type: 'reply',
      replyTo: request.params.id, // reply相手のcomment idがここに入ることになる。
      createdAt: new Date(),
    });
    const meetup = await Meetup.findById(meetupId);
    meetup.totalComments++;
    meetup.comments.push(reply);
    meetup.save();
    response.status(201).json({
      reply,
    });
  } catch (error) {
    console.log(error);
  }
};
