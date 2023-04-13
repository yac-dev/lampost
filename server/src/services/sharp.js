import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { uploadEffectedPhoto } from './s3';

export const addPhotoEffect = async (fileName, effect) => {
  const inputFilePath = path.join(__dirname, '..', '..', 'assets', 'photos', fileName);
  const overlayInputFilePath = path.join(__dirname, '..', '..', 'overlays', 'photos', `${effect}.jpg`);
  const outputFilePath = path.join(__dirname, '..', '..', 'tmp', fileName);

  await sharp(inputFilePath)
    .rotate()
    .resize(500, 500)
    .modulate({
      brightness: 0.85,
    })
    .blur(1)
    .composite([
      {
        input: overlayInputFilePath,
        blend: 'overlay',
      },
    ])
    .toFile(outputFilePath); // output
  // この後に、このfileをawsに上げる。
  uploadEffectedPhoto(fileName);
};
