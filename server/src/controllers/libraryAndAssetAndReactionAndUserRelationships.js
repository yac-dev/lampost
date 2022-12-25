import LibraryAndAssetAndReactionAndUserRelationship from '../models/libraryAndAssetAndReactionAndUserRelationship';
import Reaction from '../models/reaction';

export const createReaction = async (request, response) => {
  try {
    const { libraryId, asset, user, content } = request.body;
    const reaction = await Reaction.create({ content });
    const libraryAndAssetAndReactionAndUserRelationship = await LibraryAndAssetAndReactionAndUserRelationship.create({
      library: libraryId,
      asset: asset._id,
      reaction: reaction._id,
      user: user._id,
      createdAt: new Date(),
    });

    response.status(200).json({
      reaction: {
        library: libraryId,
        asset: { _id: asset._id, data: asset.data },
        reaction: { _id: reaction._id, content: reaction.content },
        user: { _id: user._id, name: user.name, photo: user.photo },
        createdAt: libraryAndAssetAndReactionAndUserRelationship.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReactionsByLibraryId = async (request, response) => {
  try {
    const libraryAndAssetAndReactionAndUserRelationship = await LibraryAndAssetAndReactionAndUserRelationship.find({
      library: request.params.libraryId,
    }).populate([
      {
        path: 'asset',
      },
      {
        path: 'reaction',
      },
      {
        path: 'user',
      },
    ]);
    // ここ、aggregationを使った方がいいかもな。libraryidでまず全部捕まえてきて、assetとreactionとuserをまとめる感じかな。
    // [ { asset: {_id: '1111', data: 'https://'}, reaction: {_id: '2222', content: 'Really nice photo!!'} , user: {_id: '3333', name: 'Yosuke', photo: 'https://ukkkk'}, totalCounts: 300, createdAt: '9/22 2022'}] このobjectのarrayを全部送る感じか。aggregationを自分で作ればいいか。とりあえず。 // forの方がいいわ。
    const reactions = [];
    for (let i = 0; i < libraryAndAssetAndReactionAndUserRelationship.length; i++) {
      reactions.push({
        asset: {
          _id: libraryAndAssetAndReactionAndUserRelationship[i].asset._id,
          asset: libraryAndAssetAndReactionAndUserRelationship[i].asset.data,
        },
        reaction: {
          _id: libraryAndAssetAndReactionAndUserRelationship[i].reaction._id,
          content: libraryAndAssetAndReactionAndUserRelationship[i].reaction.content,
          totalCount: 1,
        },
        user: {
          _id: libraryAndAssetAndReactionAndUserRelationship[i].user._id,
          name: libraryAndAssetAndReactionAndUserRelationship[i].user.name,
          photo: libraryAndAssetAndReactionAndUserRelationship[i].user.photo,
        },
        createdAt: libraryAndAssetAndReactionAndUserRelationship[i].createdAt,
      });
    }

    response.status(200).json({
      reactions,
    });
  } catch (error) {
    console.log(error);
  }
};
