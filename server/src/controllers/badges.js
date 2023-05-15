import Badge from '../models/badge';
import Icon from '../models/icon';
import BadgeAndBadgeTypeRelationship from '../models/badgeAndBadgeTypeRelationship';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import User from '../models/user';
import Asset from '../models/asset';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import gm from 'gm';
import sharp from 'sharp';
// VUk2Brw8Dx6dzqpFFNuRCjNe
import FormData from 'form-data';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    if (request.body.userId) {
      const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.body.userId }).populate({
        path: 'badge',
      });

      const filteringUserBadges = badgeAndUserRelationships.map((element) => element.badge._id);
      badges.where({ _id: { $nin: filteringUserBadges } });
    }

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
      Prefix: 'icons/',
    };
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const icons = data.Contents.filter((obj) => obj.Key.match(/\.(jpg|jpeg|png|gif)$/));
        response.status(200).json({
          icons,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBadge = async (request, response) => {
  try {
    const { iconId, name, color, userId, badgeTypeId } = request.body;
    const badge = await Badge.create({
      icon: iconId,
      name,
      color,
      createdBy: userId,
      createdAt: Date.now(),
    });
    const badgeAndBadgeTypeRelationship = await BadgeAndBadgeTypeRelationship.create({
      badge: badge._id,
      badgeType: badgeTypeId,
    });

    response.status(201).json({
      badge,
      badgeType: badgeTypeId,
    });
  } catch (error) {
    console.log(error);
  }
};

const executeRemoveBg = async () => {
  return new Promise((resolve, reject) => {
    const inputPath = 'originalImage.png';
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
    axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'VUk2Brw8Dx6dzqpFFNuRCjNe',
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status != 200) return console.error('Error:', response.status, response.statusText);
        fs.writeFileSync('removedBG.png', response.data);
        resolve('success');
      })
      .catch((error) => {
        return console.error('Request failed:', error);
      });
  });
};

const execureThreshhold = async (dir) => {
  const inputFilePath = path.join(dir, 'original.png');
  const outputFilePath = path.join(dir, 'threshholded.png');
  return new Promise((resolve, reject) => {
    sharp(inputFilePath)
      .threshold(105)
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          throw err;
        }
        resolve(outputFilePath);
      });
  });
};
// fileのpathを使わないといけないな。
const executeTransparent = async (dir) => {
  const inputFilePath = path.join(dir, 'threshholded.png');
  const outputfilePath = path.join(dir, 'transparented.png');
  return new Promise((resolve, reject) => {
    // Import the image
    gm(inputFilePath)
      // Invoke transparent function on white color
      .transparent('white')
      // Process and Write the image
      .write(outputfilePath, function (err) {
        if (!err) {
          console.log('done');
          resolve(outputfilePath);
        }
      });
  });
};

export const createIconPreview = async (request, response) => {
  try {
    // const tmpDirName = path.join(__dirname, '..', '..', 'tmp', request.file.filename);
    // const dir = fs.mkdirSync(tmpDirName);
    // const imageData = fs.readFileSync(
    //   path.join(__dirname, '..', '..', 'badgeImages', `${request.file.filename.split('.')[0]}`, request.file.filename)
    // );
    // const tmpDirName = path.join(__dirname, '..', '..', './badgeImages', request.body.userId);
    // const dir = fs.mkdirSync(tmpDirName);
    if (request.body.exFolderName) {
      fs.rmSync(path.join(__dirname, '..', '..', './badgeImages', request.body.exFolderName), {
        recursive: true,
        force: true,
      });
    }
    const dir = path.join(__dirname, '..', '..', './badgeImages', request.body.folderName);
    const res1 = await execureThreshhold(dir);
    const res2 = await executeTransparent(dir);
    // const imageData = fs.readFileSync(path.join(dir, 'transparented.png'));
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createIconFromScratch = async (request, response) => {
  try {
    const { name, color, folderName, userId } = request.body;
    const imagePath = path.join(__dirname, '..', '..', './badgeImages', folderName, 'transparented.png');
    const fileStream = fs.createReadStream(imagePath);

    const uploadParams = {
      Bucket: process.env.AWS_S3BUCKET_NAME,
      Body: fileStream,
      Key: `assets/icons/${name}`,
    };
    await s3.upload(uploadParams).promise();
    console.log('icon image Uploaded');
    const icon = await Icon.create({
      url: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/assets/icons/${name}`,
    });
    // const icontypeをここで
    const badge = await Badge.create({
      icon: icon._id,
      name: name,
      color: color,
      createdBy: userId,
      createdAt: new Date(),
    });
    // const badgeのtypeをここで。

    fs.rmSync(path.join(__dirname, '..', '..', './badgeImages', folderName), {
      recursive: true,
      force: true,
    });
  } catch (error) {
    console.log(error);
  }
};
