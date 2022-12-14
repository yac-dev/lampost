import Library from '../models/library';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';
import Roll from '../models/roll';
import io from '../index';

export const createLibrary = async (request, response) => {
  try {
    const { name, badgeIds, description, userId, rolls } = request.body;
    console.log(name, badgeIds, description, userId, rolls);
    // const library = await Library.create({
    //   name,
    //   badges,
    //   description,
    //   launcher: userId,
    //   createdAt: new Date(),
    // });
    // 全員にsocket eventを放出する感じか。
    // io.emit('GREETING', { text: 'hello' });
    io.sockets.emit('broadcast', { text: 'hello' });
    console.log(io.sockets.sockets);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

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
