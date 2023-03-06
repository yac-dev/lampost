import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { uploadEffectedVideo } from './s3';
// const { v4: uuidv4 } = require('uuid');

// protocol
// 1. fps16で遅くする。
// 2. 色effectを足す。
// 3. blurを足す。
// 4. grain effectをoverlayする。

const effectTypesTable = {
  olive: {
    name: 'olive',
    rgb: 'g',
    color: "'0.2/0.1 0.45/0.7 1/1'",
  }, // geeen
  camel: {
    name: 'camel',
    rgb: 'r',
    color: "'0/0.2 0.3/0.5 1/1'",
  }, // red もう少し垢を強くしたいな。。。
  ocean: {
    name: 'ocean',
    rgb: 'b',
    color: "'0/0.2 0.3/0.65 1/1'",
  }, // blue
  sepia: {
    name: 'sepia',
    rgb: 'b',
    color: "'0/0.45 0.2/0.2 1/1'",
  }, // rgbどれだろう。。。redかね。。。　// blueでやった。
};
// sepia 第一候補
// 0/0.45 0.2/0.2 1/1' red?
export const execFps = (inputFilePath, assetId) => {
  console.log('started fps conversion');
  const outputFilePath = path.join(__dirname, '..', '..', 'tmp', assetId, 'fps.mp4');
  const fpsCommand = `ffmpeg -i ${inputFilePath} -filter:v fps=fps=12 ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(fpsCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

export const execVintage = (inputFilePath, assetId, effectType) => {
  console.log('started adding vintage effect');
  const outputFilePath = path.join(__dirname, '..', '..', 'tmp', assetId, 'vintage.mp4');
  const vintageCommand = `ffmpeg -i ${inputFilePath} -vf curves=${effectTypesTable[effectType]['rgb']}=${effectTypesTable[effectType]['color']},format=yuv420p -c:a copy ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(vintageCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

export const execBlur = (inputFilePath, assetId) => {
  console.log('started adding blur');
  const outputFilePath = path.join(__dirname, '..', '..', 'tmp', assetId, 'blur.mp4');
  const blurCommand = `ffmpeg -i ${inputFilePath} -vf 'gblur=sigma=4' -c:a copy ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(blurCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

// ffmpeg -i /Users/yosuke/Desktop/ffmpeg_playground/effects/grainAndFlash.mp4 -i ${inputFilePath} -filter_complex "[0]format=rgba,colorchannelmixer=aa=0.25[fg];[1][fg]overlay[out];[out]trim=0:14,setpts=PTS-STARTPTS[video]" -map "[video]" -c:v libx264 ${outputFilePath}

export const execGrain = (inputFilePath, assetId, duration, lastFileName) => {
  console.log('started adding grain');
  const outputFilePath = path.join(__dirname, '..', '..', 'tmp', assetId, lastFileName);
  const grainFilePath = path.join(__dirname, '..', '..', 'overlays', 'grainAndFlash.mp4');
  const grainCommand = `ffmpeg -i ${grainFilePath} -i ${inputFilePath} -filter_complex "[0]format=rgba,colorchannelmixer=aa=0.25[fg];[1][fg]overlay[out];[out]trim=0:${duration},setpts=PTS-STARTPTS[video]" -map "[video]" -c:v libx264 ${outputFilePath}`;

  return new Promise((resolve, reject) => {
    exec(grainCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        console.log('finished process');
        resolve(outputFilePath);
        // fs.rmSync(path.join(__dirname, '..', '..', 'tmp', assetId), { recursive: true, force: true });
      }
    });
  });
};

// assetのeffect(oliveとか)をsecond argに、third argにassetidに入れる。
export const AddEffect = (inputFileName, effectType, assetId, duration) => {
  // const date = Date.now();
  const inputFilePath = path.join(__dirname, '..', '..', 'assets', 'videos', inputFileName);
  const tmpDirName = path.join(__dirname, '..', '..', 'tmp', assetId); // このdirectoryにexecしたvideoを貯めて、最終的に捨てる。
  const dir = fs.mkdirSync(tmpDirName); // ここで、asset用のdirを作る。
  // const inputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/inputs/${inputFileName}`;
  // execNoise(inputFilePath, date, color).then((outputFilePath) => {
  execFps(inputFilePath, assetId).then((outputFilePath) => {
    execVintage(outputFilePath, assetId, effectType).then((outputFilePath) => {
      execBlur(outputFilePath, assetId).then((outputFilePath) => {
        execGrain(outputFilePath, assetId, duration, inputFileName).then(() => {
          uploadEffectedVideo(inputFileName, assetId);
          // ここでs3にuploadする。
          // upload終わったら、消すっていう感じかな。
          // aws uploadの中で消せばいいか。
          // fs.rmSync(tmpDirName, { recursive: true, force: true });
        });
      });
    });
  });
};

const vintageTest = (inputFileName, color) => {
  const date = Date.now();
  const inputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/inputs/${inputFileName}`;
  // execNoise(inputFilePath, date, color).then((outputFilePath) => {
  execVintage(inputFilePath, date, 'g', color);
};

const execNoise = (inputFilePath, date, colorType) => {
  console.log('started adding noise');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${
    colorTypesTable[colorType.color]
  }/noise${date}.mp4`;
  const noiseCommand = `ffmpeg -i ${inputFilePath} -vf noise=c0s=60:c0f=t+u ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(noiseCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

const execMonochrome = (inputFilePath) => {
  // ffmpeg -i input.mp4 -vf monochrome output.mp4
  const date = Date.now();
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/grain${date}.mp4`;
  const monochromeCommand = `ffmpeg -i ${inputFilePath} -vf monochrome ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(monochromeCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};
