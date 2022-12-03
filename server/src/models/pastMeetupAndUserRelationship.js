import mongoose from 'mongoose';

const pastMeetupAndUserRelationshipSchema = new mongoose.Schema({
  pastMeetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const PastMeetupAndUserRelationship = mongoose.model(
  'PastMeetupAndUserRelationship',
  pastMeetupAndUserRelationshipSchema
);

export default PastMeetupAndUserRelationship;
