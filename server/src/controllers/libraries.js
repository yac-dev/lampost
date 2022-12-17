import Library from '../models/library';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';
import Roll from '../models/roll';

export const getLibraries = async (request, response) => {
  try {
    const libraries = await Library.find({}).populate({
      path: 'launcher',
      select: 'name photo',
    });
    response.status(200).json({
      libraries,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLibrary = async (request, response) => {
  try {
    const library = await Library.findById(request.params.id)
      .populate({
        path: 'launcher',
        model: User,
      })
      .populate({
        path: 'badges',
      });
    response.status(200).json({
      library,
    });
  } catch (error) {
    console.log(error);
  }
};
