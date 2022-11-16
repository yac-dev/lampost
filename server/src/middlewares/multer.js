import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(__dirname);
    console.log(request.body);
    console.log(request.body.mediaType);
    const destination = path.join(__dirname, './medias');
    console.log(destination);
    callback(null, destination); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    const extension = file.mimetype.split('/')[1];
    // ここでjsonに直そうとしてもだめだ。
    const fileName = Date.now() + '-' + uuidv4() + '.' + extension;
    console.log(fileName);
    callback(null, fileName);
  },
}); // 後で、ffmpegを使った方法に直すことになる。ちゃんとしたmp3に直す。file名に関してはこのやり方でいい。

const multerParser = multer({ storage });
export default multerParser;
