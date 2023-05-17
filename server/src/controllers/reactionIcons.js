import ReactionIcon from '../models/reactionIcon';

export const getReactionIcons = async (request, response) => {
  try {
    const reactionIcons = await ReactionIcon.find({});
    response.status(200).json({
      reactionIcons,
    });
  } catch (error) {
    console.log(error);
  }
};
