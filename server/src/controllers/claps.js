import LeadershipClap from '../models/leadershipClap';
import PersonalityClap from '../models/personalityClap';
import User from '../models/user';

export const clapLeadership = async (request, response) => {
  try {
    const { userId, clappedUserId, traits } = request.body;
    const leadershipClap = await LeadershipClap.create({
      user: userId,
      launcher: clappedUserId,
      claps: traits,
      createdAt: Date.now(),
    });
    const launcher = await User.findById(clappedUserId);
    for (const trait in traits) {
      launcher.leadership[trait] = launcher.leadership[trait] + traits[trait];
    }
    launcher.save();
    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const clapPersonality = async (request, response) => {
  try {
    const { userId, clappedUserId, traits } = request.body;
    const personalityClap = await PersonalityClap.create({
      user: userId,
      clappedUser: clappedUserId,
      claps: traits,
      createdAt: Date.now(),
    });
    const user = await User.findById(clappedUserId);
    for (const trait in traits) {
      user.personality[trait] = user.personality[trait] + traits[trait];
    }
    user.save();
    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
