import ReactionIcon from '../models/reactionIcon';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import axios from 'axios';
// VUk2Brw8Dx6dzqpFFNuRCjNe
import FormData from 'form-data';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

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

const executeRemoveBg = async (inputFilePath, fileName) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, '..', '..', 'reactionIconImages', `removed-${fileName}`);
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(inputFilePath), path.basename(inputFilePath));
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
        fs.writeFileSync(outputPath, response.data);
        unlinkFile(inputFilePath);
        resolve('success');
      })
      .catch((error) => {
        return console.error('Request failed:', error);
      });
  });
};

export const createReactionIconPreview = async (request, response) => {
  try {
    // 今回はfile deleteね。
    if (request.body.exFileName) {
      await unlinkFile(
        path.join(__dirname, '..', '..', './reactionIconImages', `removed-${request.body.exFileName}.png`)
      );
    }
    const inpuFilePath = path.join(__dirname, '..', '..', './reactionIconImages', request.file.filename);
    const res1 = await executeRemoveBg(inpuFilePath, request.file.filename);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createReactionIcon = async (request, response) => {
  try {
    const imagePath = path.join(__dirname, '..', '..', './reactionIconImages', `removed-${request.body.fileName}.png`);
    const fileStream = fs.createReadStream(imagePath);

    const uploadParams = {
      Bucket: process.env.AWS_S3BUCKET_NAME,
      Body: fileStream,
      Key: `reactionIcons/removed-${request.body.fileName}.png`,
    };
    await s3.upload(uploadParams).promise();
    await unlinkFile(imagePath);
    const reactionIcon = await ReactionIcon.create({
      url: `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/reactionIcons/removed-${request.body.fileName}.png`,
      name: `removed-${request.body.fileName}.png`,
    });
    response.status(200).json({
      reactionIcon,
    });
  } catch (error) {
    console.log(error);
  }
};
