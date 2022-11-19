import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const s3 = new S3({
  region: process.env.AWS_S3BUCKET_REGION,
  accessKeyId: process.env.AWS_S3BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3BUCKET_SECRET_KEY,
});
