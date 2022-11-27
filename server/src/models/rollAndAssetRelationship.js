import mongoose from 'mongoose';

const rollAndAssetRelationship = new mongoose.Schema({
  // どのrollにどのassetがあるか、そんなrel tableを作るしなかい。
  roll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Roll',
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
});

// roll id {111111}に、asset {23456}, asset {34555}が入る感じ。assetが色んなrollにpostできるようにしたい。

const RollAndAssetRelationship = mongoose.model('RollAndAssetRelationships', rollAndAssetRelationship);
export default RollAndAssetRelationship;
