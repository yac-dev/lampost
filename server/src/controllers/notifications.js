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
