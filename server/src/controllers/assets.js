import Asset from '../models/asset';
import Meetup from '../models/meetup';
import User from '../models/user';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { uploadPhoto, uploadNormalVideo } from '../services/s3';
import { AddEffect } from '../services/ffmpeg';
import { addPhotoEffect } from '../services/sharp';
import sharp from 'sharp';

export const createPhoto = async (request, response) => {
  try {
    const { meetupId, userId, type, effect, ...rest } = request.body;
    const taggedUserIds = Object.values(rest);
    const asset = await Asset.create({
      data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/photos/${request.file.filename}`,
      type: 'photo',
      meetup: meetupId,
      effect: effect,
      taggedPeople: taggedUserIds,
      createdBy: userId,
      createdAt: new Date(),
    });
    // ここでsharpを動かすわけだが、、、
    const meetup = await Meetup.findById(meetupId);
    if (meetup.topPhotos.length <= 2) {
      meetup.topPhotos.push(asset._id);
      meetup.save();
    }

    if (effect === 'normal') {
      uploadPhoto(request.file.filename);
    } else {
      addPhotoEffect(request.file.filename, effect);
    }

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log('this is the api error', error);
    response.status(400).json({
      message: 'Error happend camera',
    });
  }
};

export const createVideo = async (request, response) => {
  try {
    const { meetupId, userId, type, effect, duration, ...rest } = request.body;
    const taggedUserIds = Object.values(rest);
    const asset = new Asset({
      data: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/videos/${request.file.filename}`,
      type: type,
      meetup: meetupId,
      effect: effect,
      duration: duration,
      taggedPeople: taggedUserIds,
      createdBy: userId,
      createdAt: new Date(),
    });
    // これ、何？？effectのconditionではなくて？？？
    if (type !== 'normal') {
      AddEffect(request.file.filename, effect, asset._id.toString(), asset.duration);
    } else {
      uploadNormalVideo(request.file.filename);
    }
    // asset idを使ってfolderを作りましょう。
    //  ここで、ffmpegを動かす。
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
      .populate({ path: 'meetup', select: 'title' })
      .populate({ path: 'createdBy', select: 'name photo _id' })
      .populate({
        path: 'taggedPeople',
        select: 'name photo',
      });
    response.status(200).json({
      asset,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMeetupAssets = async (request, response) => {
  try {
    const assets = await Asset.find({ meetup: request.params.meetupId }).select({ type: 1, effect: 1, data: 1 });
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};
