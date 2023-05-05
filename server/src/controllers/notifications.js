import Notification from '../models/notification';

export const getNotifications = async (request, response) => {
  try {
    const notifications = await Notification.find({ to: request.params.userId }).populate({
      path: 'from',
      select: '_id photo name',
    });
    // client側で、unread readのやつだけ取ってくればいい。
    response.status(200).json({
      notifications,
    });
  } catch (error) {
    console.log(error);
  }
};

// type: String, // invitation , following
//   platform: String, // library, meetup, port
//   title: String,
//   message: String,
//   isRead: {
//     type: Boolean,
//     default: false,
//   },
//   from: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//   },
//   to: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User', // 自分向けのnotificationを
//   },
//   library: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Library',
//   },
//   meetup: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'meetup',
//   },
//   createdAt: Date,

export const createLibraryInvitation = async (request, response) => {
  try {
    const { friendIds, user, invitationMessage } = request.body;
    for (const friendId of friendIds) {
      const notification = await Notification.create({
        type: 'invitation',
        platform: 'library',
        from: user._id,
        to: friendId,
        title: `You got a library invitation from ${user.name}`,
        message: invitationMessage,
        library: request.params.libraryId,
        createdAt: new Date(),
      });
    }

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
