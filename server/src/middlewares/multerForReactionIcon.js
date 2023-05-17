import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(file);
    const filePath = path.join(__dirname, './reactionIconImages');
    // const destination = path.join(__dirname, './badgeImages', );
    callback(null, filePath); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    const fileName = request.body.fileName + '.png';
    callback(null, fileName);
  },
}); // 後で、ffmpegを使った方法に直すことになる。ちゃんとしたmp3に直す。file名に関してはこのやり方でいい。

const multerParser = multer({ storage });
export default multerParser;
