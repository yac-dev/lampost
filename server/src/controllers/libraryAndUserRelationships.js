import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Library from '../models/library';

export const joinLibrary = async (request, response) => {
  try {
    const { libraryId, userId } = request.body;
    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: libraryId,
      user: userId,
    });

    await libraryAndUserRelationship.populate({ path: 'library', select: 'name color' });
    response.status(201).json({
      // relationshipのobjectをそのまま渡さないことね。populateしたobjectをそのまま渡す。
      library: libraryAndUserRelationship.library,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyJoinedLibrary = async (request, response) => {
  try {
    const myJoinedLibrariesRelationships = await LibraryAndUserRelationship.find({ user: request.params.userId })
      .select({ library: 1 })
      .populate({
        path: 'library',
        select: 'name color',
      });
    // [ {library: {name: 'qqqqq', description: 'hfuhoifhiqw'}, user: {'11111'} ]って面倒だからね。
    // 少なくとも、relationshipをまんま渡すのはやだわ。ごっちゃになる。
    const myJoinedLibraries = myJoinedLibrariesRelationships.map((libraryRelationship) => {
      return libraryRelationship.library;
    });

    response.status(200).json({
      myJoinedLibraries,
    });
  } catch (error) {}
};

export const leaveLibrary = async (request, response) => {
  try {
    const libraryAndUserRelationship = await LibraryAndUserRelationship.findOne({
      library: request.body.libraryId,
      user: request.body.userId,
    });
    // ここでdeleteのoperationをする。
  } catch (error) {
    console.log(error);
  }
};
