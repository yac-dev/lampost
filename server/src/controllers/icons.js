import Icon from '../models/icon';

export const getIcons = async (request, response) => {
  try {
    // const limit = 200;
    // const page = request.query.page;
    // const skip = (page - 1) * limit;
    // let icons = Icon.find();
    // icons = await icons.skip(skip).limit(limit);
    const icons = await Icon.find();
    response.status(200).json({
      icons,
    });
  } catch (error) {
    console.log(error);
  }
};
