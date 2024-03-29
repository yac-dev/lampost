import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Library from '../models/library';
import Icon from '../models/icon';

export const joinLibrary = async (request, response) => {
  try {
    const { libraryId, userId } = request.body;
    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: libraryId,
      user: userId,
    });

    await libraryAndUserRelationship.populate({
      path: 'library',
      select: 'title color thumbnail',
      populate: { path: 'thumbnail' },
    });
    response.status(201).json({
      // relationshipのobjectをそのまま渡さないことね。populateしたobjectをそのまま渡す。
      library: libraryAndUserRelationship.library,
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveLibrary = async (request, response) => {
  try {
    const { libraryId, userId } = request.params;
    const libraryAndUserRelationship = await LibraryAndUserRelationship.deleteOne({ library: libraryId, user: userId });
    response.status(201).json({
      message: 'success',
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
        select: 'title color assetType isPublic totalAssets mood',
        populate: { path: 'thumbnail', select: 'data type' },
      });

    const myJoinedLibraries = [];
    // 最終的に、libraryがnullなやつをここで返さない。
    myJoinedLibrariesRelationships.forEach((libraryRelationship) => {
      if (libraryRelationship.library) {
        myJoinedLibraries.push(libraryRelationship.library);
      }
    });

    response.status(200).json({
      myJoinedLibraries,
    });
  } catch (error) {}
};

export const getUsersByLibraryId = async (request, response) => {
  try {
    const libraryAndUserRelationships = await LibraryAndUserRelationship.find({
      library: request.params.libraryId,
    }).populate({
      path: 'user',
      select: '_id name photo topBadges',
      populate: {
        path: 'topBadges',
        populate: {
          path: 'badge',
          populate: {
            path: 'icon',
            model: Icon,
          },
        },
      },
    });
    const users = [];
    // userがnullなやつをここで返さない。
    libraryAndUserRelationships.forEach((relationship) => {
      if (relationship.user) {
        users.push(relationship.user);
      }
    });

    response.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
