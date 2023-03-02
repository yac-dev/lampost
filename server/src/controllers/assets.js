import Asset from '../models/asset';
import Meetup from '../models/meetup';
import User from '../models/user';
import { uploadPhoto, uploadVideo } from '../services/s3';

export const createPhoto = async (request, response) => {
  try {
    const { meetupId, userId, type, ...rest } = request.body;
    const taggedUserIds = Object.values(rest);
    const asset = await Asset.create({
      data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/photos/${request.file.filename}`,
      type: 'photo',
      meetup: meetupId,
      taggedPeople: taggedUserIds,
      createdBy: userId,
      createdAt: new Date(),
    });
    uploadPhoto(request.file.filename);
    response.status(200).json({
      message: 'success',
    });
    // console.log(`tagged ${taggedUserIds}`);
    // response.status(200).json({
    //   message: 'success',
    // });

    //   const user = await User.findById(userId);
    // if (!user.ongoingMeetup.state) {
    //   // ここでerrorを返すのか。
    //   throw new Error('This is the error');
    // } else {
    // }
  } catch (error) {
    console.log('this is the api error', error);
    response.status(400).json({
      message: 'Error happend camera',
    });
  }
};

export const createVideo = async (request, response) => {
  try {
    const { meetupId, userId, type, ...rest } = request.body;
    const taggedUserIds = Object.values(rest);
    const asset = await Asset.create({
      data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
      type: type,
      meetup: meetupId,
      taggedPeople: taggedUserIds,
      createdBy: userId,
      createdAt: new Date(),
    });
    // uploadVideo(request.file.filename);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserAssets = async (request, response) => {
  try {
    console.log(request.body.userId);
    const assets = await Asset.find({ createdBy: request.params.userId });
    console.log(assets);
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAssetById = async (request, response) => {
  try {
    const asset = await Asset.findById(request.params.id)
      .populate({ path: 'badges', populate: { path: 'badge' } })
      .populate({ path: 'createdBy', select: 'name photo _id' });
    response.status(200).json({
      asset,
    });
  } catch (error) {
    console.log(error);
  }
};
