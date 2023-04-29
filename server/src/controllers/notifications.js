import Invitation from '../models/invitation';

// library creatorがfromになって、友達たちがtoになる感じだ。
export const createInvitation = async (request, response) => {
  try {
    const { type, from, to } = request.body; // typeによって、titleを変える。
    const invitation = await Invitation.create({
      type,
      from,
      to,
      isRead: false,
      createdAt: Date.now(),
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getInvitations = async (request, response) => {
  try {
    const invitations = await Invitation.find({ to: request.params.userId });
    // client側で、unread readのやつだけ取ってくればいい。
    response.status(200).json({
      invitations,
    });
  } catch (error) {
    console.log(error);
  }
};
