import Badge from '../models/badge';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import User from '../models/user';
import Asset from '../models/asset';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

export const getBadges = async (request, response) => {
  try {
    // const filteringUserBadges = [];
    const { filterOption } = request.body;

    let badges = await Badge.find({ type: filterOption }); // grab all
    // if (request.body.userId) {
    //   const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.body.userId }).populate({
    //     path: 'badge',
    //   });

    //   const filteringUserBadges = badgeAndUserRelationships.map((element) => element.badge._id);
    //   badges.where({ _id: { $nin: filteringUserBadges } });
    // }

    // let queryFilters = [];

    // if (request.query.type) {
    //   const queryByType = { type: request.query.type };
    //   queryFilters.push(queryByType);
    // }
    // if (request.query.name) {
    //   const queryByName = { name: request.query.name };
    //   queryFilters.push(queryByName);
    // }

    // if (queryFilters.length) {
    //   badges = badges.where({ $and: queryFilters });
    // }

    // const limit = 600;
    // const page = request.query.page;
    // const skip = (page - 1) * limit;

    // badges = await badges.skip(skip).limit(limit);

    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgesByFilteringUserBadges = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getBadgesByRolls = async (request, response) => {
  try {
    let badges = Badge.find({}).populate({
      path: 'rolls',
      model: Roll,
    });
    badges = await badges.limit(10);
    response.status(200).json({
      badgeFolders: badges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeRolls = async (request, response) => {
  try {
    let badgeRolls = Badge.findById(request.params.id)
      .populate({
        path: 'rolls',
        model: Roll,
        populate: {
          path: 'assets',
          model: Asset,
        },
      })
      .select({ _id: 1, rolls: 1 });
    console.log('working');

    badgeRolls = await badgeRolls.limit(10);
    response.status(200).json({
      badgeRolls: badgeRolls.rolls,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getIcons = async (request, response) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3BUCKET_NAME,
      Key: 'assets/icons/',
    };
    s3.getObject(params, (data) => {
      console.log(data);
    });
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
