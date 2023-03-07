import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
import S3 from 'aws-sdk/clients/s3';
import path from 'path';

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY_FOR_SERVER, // このexpress appのbucketにアクセスするためのunique name。
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY_FOR_SERVER, // そして、それのpassword。
});

export const uploadPhoto = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'assets', 'photos', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/photos/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
  console.log('photo Uploaded');

  await unlinkFile(filePath);
};

export const uploadNormalVideo = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'assets', 'videos', fileName);
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/videos/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
  console.log('normal video Uploaded');
  await unlinkFile(originalFilePath);
};

export const uploadEffectedVideo = async (fileName, assetId) => {
  // uploadするのはgrain足されたやつな。
  const __dirname = path.resolve();
  const originalFilePath = path.join(__dirname, 'assets', 'videos', fileName);
  const uploadingGrainFilePath = path.join(__dirname, 'tmp', assetId, fileName);
  const fileStream = fs.createReadStream(uploadingGrainFilePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/videos/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
  console.log('video Uploaded');
  await unlinkFile(originalFilePath);
  fs.rmSync(path.join(__dirname, 'tmp', assetId), { recursive: true, force: true });
};

export const uploadAvatar = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'avatars', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `avatars/${fileName}`,
  };
  await s3.upload(uploadParams).promise();

  await unlinkFile(filePath);
};

export const uploadThumbnail = async (fileName) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'avatars', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: `assets/thumbnails/${fileName}`,
  };
  await s3.upload(uploadParams).promise();

  await unlinkFile(filePath);
};
