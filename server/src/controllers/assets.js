export const createPhoto = async (request, response) => {
  try {
    console.log('body data from controller', request.body.meetupId, request.body.userId);
    // こっから、photoをawsに保存していく。
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
