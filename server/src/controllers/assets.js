import { uploadPhoto } from '../services/s3';

export const createPhoto = async (request, response) => {
  try {
    //　ここで、compressなり画像の編集なりをしないといけない。それは後で。
    uploadPhoto(request.file.filename);
    response.status(200).json({
      m: 'success!',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
