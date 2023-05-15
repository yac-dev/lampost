import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(file);
    const tmpDirName = path.join(__dirname, './badgeImages', request.body.folderName);
    const dir = fs.mkdirSync(tmpDirName);
    // const destination = path.join(__dirname, './badgeImages', );
    callback(null, tmpDirName); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    const extension = file.mimetype.split('/')[1];
    const fileName = 'original' + '.png';
    // const fileName = `original.${extension}`
    callback(null, fileName);
  },
}); // 後で、ffmpegを使った方法に直すことになる。ちゃんとしたmp3に直す。file名に関してはこのやり方でいい。

const multerParser = multer({ storage });
export default multerParser;
