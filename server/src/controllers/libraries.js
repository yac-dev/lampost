import Library from '../models/library';
import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
// import BadgeAndAssetRelationship from '../models/badgeAndAssetRelationship';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';
import Reaction from '../models/reaction';
import Notification from '../models/notification';
import Icon from '../models/icon';
import ReactionIcon from '../models/reactionIcon';

const colors = ['red1', 'blue1', 'yellow1', 'violet1', 'green1', 'lightBlue1'];

export const getLibraries = async (request, response) => {
  try {
    const libraries = await Library.find({ isPublic: true })
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
        select: '_id name photo',
      })
      .populate({
        path: 'badges',
        populate: {
          path: 'icon',
          model: Icon,
        },
      })
      .populate({
        path: 'reactions',
        populate: {
          path: 'reactionIcon',
          model: ReactionIcon,
        },
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
      isCommentAvailable,
      reactions,
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
      description,
      isPublic,
      launcher: launcher._id,
      thumbnail: asset._id,
      mood: '🔥',
      totalAssets: 1,
      totalMembers: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date(),
    });

    const libraryAndAssetRelationship = new LibraryAndAssetRelationship({
      library: library._id,
      asset: asset._id,
      createdAt: new Date(),
    });

    if (isReactionAvailable && reactions.length) {
      const reactionOptions = reactions.map((reaction) => {
        if (reaction.iconType === 'emoji') {
          return {
            library: library._id,
            iconType: 'emoji',
            emoji: reaction.emoji,
          };
        } else if (reaction.iconType === 'reactionIcon') {
          return {
            library: library._id,
            iconType: 'reactionIcon',
            reactionIcon: reaction.reactionIcon._id,
          };
        }
      });
      const createdReactions = await Reaction.insertMany(reactionOptions);
      const reactionIds = createdReactions.map((reaction) => reaction._id);
      // ここでreactionのidだけ入れる。そんで、↓でsaveする。
      library.reactions = reactionIds;
    }
    if (isReactionAvailable && isCommentAvailable) {
      library.isCommentAvailable = true;
    } else {
      library.isCommentAvailable = false;
    }
    library.save();
    libraryAndAssetRelationship.save();

    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: library._id,
      user: launcher._id,
      createdAt: new Date(),
    });

    // ここで、友達たちにinvitationを送る。
    if (friendIds.length) {
      for (const friendId of friendIds) {
        const notifications = await Notification.create({
          type: 'invitation',
          platform: 'library',
          from: launcher,
          to: friendId,
          title: `You got a library invitation from ${launcher.name}`,
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
        isPublic: library.isPublic,
        totalAssets: 1,
        mood: '🔥',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
