import Impression from '../models/impression';
import User from '../models/user';

export const createImpression = async (request, response) => {
  try {
    const { meetupId, user, content, emojis, launcherId } = request.body;
    const impression = await Impression.create({
      meetup: meetupId,
      user: user._id,
      content,
      emojis,
      createdAt: Date.now(),
    });
    // launcherのidが必要だ。launcherのfameを上げなきゃいけない。
    const emojisMultiple = emojis.length ? emojis.length : 1;
    const launcher = await User.findById(launcherId);
    const upvote = 3 * emojisMultiple;
    launcher.fame = launcher.fame + upvote;
    launcher.save();

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
