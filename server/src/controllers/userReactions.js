import UserReaction from '../models/userReaction';

export const createReaction = async (request, response) => {
  try {
    const userReaction = await UserReaction.create({
      libraryAsset: '',
      user: '',
      reaction: '',
      upvoted: 1,
    });
  } catch (error) {
    console.log(error);
  }
};
