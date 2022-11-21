import Roll from '../models/roll';
import User from '../models/user';
import Meetup from '../models/meetup';
import Asset from '../models/asset';

export const createRoll = async (request, response) => {
  try {
    const { name, badges, description, createdBy } = request.body;
    const roll = await Roll.create({
      name,
      badges,
      description,
      createdBy,
      createdAt: new Date(),
    });
    // const meetup = await Meetup.findById(request.body.meetupId).populate({
    //   path: 'assets',
    //   model: Asset,
    // });
    // for (let i = 0; i < meetup.assets; i++) {
    //   meetup.assets[i].roll = roll._id;
    // }

    // meetup.save();
    response.status(200).json({
      roll,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRolls = async (request, response) => {
  try {
    const rolls = await Roll.find({}).populate({
      path: 'createdBy',
      model: User,
    });
    response.status(200).json({
      rolls,
    });
  } catch (error) {
    console.log(error);
  }
};
