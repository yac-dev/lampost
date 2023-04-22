import mongoose from 'mongoose';

const iconAndIconTypeRelationshipSchema = new mongoose.Schema({
  icon: {
    type: mongoose.Schema.ObjectId,
    ref: 'Icon',
  },
  iconType: {
    type: mongoose.Schema.ObjectId,
    ref: 'IconType',
  },
});
// あくまで、これはreactionを作成する際のicon queryな。

const IconAndIconTypeRelationship = mongoose.model('IconAndIconTypeRelationship', iconAndIconTypeRelationshipSchema);
export default IconAndIconTypeRelationship;
