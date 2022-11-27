import Asset from '../models/asset';
import Meetup from '../models/meetup';
import { uploadPhoto } from '../services/s3';

export const createPhoto = async (request, response) => {
  try {
    const { meetupId, userId } = request.body;
    const asset = await Asset.create({
      data: `https://lampost-dev.s3.us-east-2.amazonaws.com/assets/photos/${request.file.filename}`,
      type: 'photo',
      meetup: meetupId,
      createdBy: userId,
      createdAt: new Date(),
    });
    const meetup = await Meetup.findById(meetupId);
    meetup.assets.push(asset);
    meetup.save();
    uploadPhoto(request.file.filename);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getUserAssets = async (request, response) => {
  try {
    const assets = await Asset.find({ createdBy: request.body.userId });
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAsset = async (request, response) => {
  try {
    const asset = await Asset.findById(request.params.id);
    response.status(200).json({
      asset,
    });
  } catch (error) {
    console.log(error);
  }
};
