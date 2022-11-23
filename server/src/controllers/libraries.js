import Library from '../models/library';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';
import Roll from '../models/roll';

export const createLibrary = async (request, response) => {
  try {
    const { name, badges, description, userId } = request.body;
    const library = await Library.create({
      name,
      badges,
      description,
      launcher: userId,
      createdAt: new Date(),
    });
    response.status(200).json({
      library,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLibraries = async (request, response) => {
  try {
    const libraries = await Library.find({});
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
        path: 'rolls',
        model: Roll,
        populate: {
          path: 'assets',
          model: Asset,
        },
      });
    response.status(200).json({
      library,
    });
  } catch (error) {
    console.log(error);
  }
};
