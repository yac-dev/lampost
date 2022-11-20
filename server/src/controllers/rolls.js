import Roll from '../models/roll';
import Meetup from '../models/meetup';
import Asset from '../models/asset';

export const createRoll = async (request, response) => {
  try {
    const { name, badge } = request.body;
    const roll = await Roll.create({
      name,
      badge,
    });

    const meetup = await Meetup.findById(request.body.meetupId).populate({
      path: 'assets',
      model: Asset,
    });
    for (let i = 0; i < meetup.assets; i++) {
      meetup.assets[i].roll = roll._id;
    }
    meetup.save();
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
