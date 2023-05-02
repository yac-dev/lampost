import Library from '../models/library';
import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
// import BadgeAndAssetRelationship from '../models/badgeAndAssetRelationship';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';
import Reaction from '../models/reaction';
import Notification from '../models/notification';

const colors = ['red1', 'blue1', 'yellow1', 'violet1', 'green1', 'lightBlue1'];

export const getLibraries = async (request, response) => {
  try {
    const libraries = await Library.find({})
      .select({ title: 1, thumbnail: 1, assetType: 1 })

      .populate({
        path: 'thumbnail',
        select: 'data type',
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

export const createLibrary = async (request, response) => {
  // created documents
  // もうさ、relを作る必要ないよね。。。もう。普通に、libraryAndAssetにreactionをそのままつければいい。だって、length3つだもん。
  // library, libraryAndAssetRelationship, libraryAndUserRelationship, reactions,  x reactionAndLibraryAssetRelationship
  try {
    const {
      title,
      badgeIds,
      assetType,
      isPublic,
      isReactionAvailable,
      reactions,
      isCommentAvailable,
      description,
      asset,
      launcher,
      friendIds,
      invitationMessage,
    } = request.body;

    const library = new Library({
      title,
      badges: badgeIds,
      assetType,
      isReactionAvailable,
      isCommentAvailable,
      description,
      isPublic,
      launcher: launcher._id,
      thumbnail: asset._id,
      totalAssets: 1,
      totalMembers: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date(),
    });

    const libraryAndAssetRelationship = new LibraryAndAssetRelationship({
      library: library._id,
      asset: asset._id,
    });

    if (isReactionAvailable && reactions.length) {
      const reactionOptions = reactions.map((reaction) => {
        return {
          library: library._id,
          icon: reaction.icon,
          comment: reaction.comment,
          color: reaction.color,
        };
      });
      const createdReactions = await Reaction.insertMany(reactionOptions);
      const reactionIds = createdReactions.map((reaction) => reaction._id);
      // ここでreactionのidだけ入れる。そんで、↓でsaveする。
      library.reactions = reactionIds;
      const reactionWithUpvote = reactionIds.map((reactionId) => {
        return {
          reaction: reactionId,
          upvoted: 0,
          users: [],
        };
      });
      libraryAndAssetRelationship.reactions = reactionWithUpvote;
    }
    library.save();
    libraryAndAssetRelationship.save();

    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: library._id,
      user: launcher._id,
    });

    // ここで、友達たちにinvitationを送る。
    if (friendIds.length) {
      for (const friendId of friendIds) {
        const notifications = await Notification.create({
          type: 'invitation',
          platform: 'library',
          from: launcher,
          to: friendId,
          title: `You got a library invitation.`,
          message: invitationMessage,
          library: library._id,
          createdAt: new Date(),
        });
      }
    }

    response.status(200).json({
      library: {
        _id: library._id,
        title: library.title,
        thumbnail: { data: asset.data, type: asset.type },
        assetType: assetType,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
