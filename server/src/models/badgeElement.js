import mongoose from 'mongoose';

const badgeElementSchema = new mongoose.Schema({
  // JavaScript
  value: {
    type: String,
  },
  // tech
  elementType: {
    type: String,
  },
  // FontAwesome5 or icons8
  // iconType: {
  //   type: String,
  // },
  // // faSquareJs or icons8-,,,-,,,.png
  // iconName: {
  //   type: String,
  // },
});

const BadgeElement = mongoose.model('BadgeElement', badgeElementSchema);
export default BadgeElement;
