import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: String, // invitation , following
  platform: String, // library, meetup, port
  title: String,
  message: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // 自分向けのnotificationを
  },
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'meetup',
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
