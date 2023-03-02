const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const colorsTable = {
  olive: "'0.2/0.1 0.5/0.65 1/1'",
  cherry: "'0/0.2 0.5/0.4 1/1'",
  camel: '',
  blue: '',
  sepia: '',
  blackAndWhite: '',
};

const execResize = (inputFilePath, date, color) => {
  console.log('started resizing');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/resize${date}.mp4`;
  const resizeCommand = `ffmpeg -i ${inputFilePath} -vf scale=1080:1920,pad=1080:1920:0:0:black -c:v mpeg4  -q:v 1 ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(resizeCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

const execFps = (inputFilePath, date, color) => {
  console.log('started fps conversion');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/fps${date}.mp4`;
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

const execVintage = (inputFilePath, date, color) => {
  console.log('started adding vintage effect');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/vintage${date}.mp4`;
  const vintageCommand = `ffmpeg -i ${inputFilePath} -vf curves=g=${colorsTable[color]},format=yuv420p -c:a copy ${outputFilePath}`;
  return new Promise((resolve, reject) => {
    exec(vintageCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

const execNoise = (inputFilePath, date, color) => {
  console.log('started adding noise');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/noise${date}.mp4`;
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

const execBlur = (inputFilePath, date, color) => {
  console.log('started adding blur');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/blur${date}.mp4`;
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

const execGrain = (inputFilePath, date, color) => {
  console.log('started adding grain');
  const outputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/outputs/${color}/grain${date}.mp4`;

  const grainCommand = `ffmpeg -i /Users/yosuke/Desktop/ffmpeg_playground/effects/resizedGrain.mp4 -i ${inputFilePath} -filter_complex "[0:a][1:a]amerge[mixedAudio];[0]format=rgba,colorchannelmixer=aa=0.25[fg];[1][fg]overlay[out]" -map "[out]" -map "[mixedAudio]" -pix_fmt yuv420p -c:v libx264 -crf 18 ${outputFilePath}`;

  return new Promise((resolve, reject) => {
    exec(grainCommand, (err, stdout, stderr) => {
      if (err) console.log('Error ', err);
      else {
        resolve(outputFilePath);
      }
    });
  });
};

const create = (inputFileName, color) => {
  const date = Date.now();
  const inputFilePath = `/Users/yosuke/Desktop/ffmpeg_playground/inputs/${inputFileName}`;
  execResize(inputFilePath, date, color).then((outputFilePath) => {
    execFps(outputFilePath, date, color).then((outputFilePath) => {
      execVintage(outputFilePath, date, color).then((outputFilePath) => {
        execBlur(outputFilePath, date, color).then((outputFilePath) => {
          execGrain(outputFilePath, date, color);
        });
      });
    });
  });
  // execFps(inputFilePath, date, color).then((outputFilePath) => {
  //   execBlur(outputFilePath, date, color).then(() => {
  //     execVintage(outputFilePath, date, color).then((outputFilePath) => {
  //       execGrain(outputFilePath, date, color);
  //     });
  //   });
  // });
};
