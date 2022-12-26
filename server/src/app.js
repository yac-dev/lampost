import express from 'express';
import cors from 'cors';
import './databases/mongoose';

// routers
import authRouter from './routers/auth';
import usersRouter from './routers/users';
import meetupsRouter from './routers/meetups';
import badgesRouter from './routers/badges';
import commentsRouter from './routers/comments';
import chatsRouter from './routers/chats';
import badgeStatusesRouter from './routers/badgeStatuses';
import assetsRouter from './routers/assets';
import assetPostsRouter from './routers/assetPosts';
import rollsRouter from './routers/rolls';
import librariesRouter from './routers/libraries';
import rollAndAssetRelationshipsRouter from './routers/rollAndAssetRelationships';
import libraryAndUserRelationshipsRouter from './routers/libraryAndUserRelationships';
import pastMeetupAndUserRelationshipsRouter from './routers/pastMeetupAndUserRelationships';
import badgeAndUserRelationshipsRouter from './routers/badgeAndUserRelationships';
import assetAndUserRelationshipsRouter from './routers/assetAndUserRelationships';
import libraryAndAssetRelationshipsRouter from './routers/libraryAndAssetRelationships';
import loungeChatAndChatRoomRelationshipsRouter from './routers/loungeChatAndChatRoomRelationships';
import assetPostAndReactionAndUserRelationshipsRouter from './routers/assetPostAndReactionAndUserRelationships';

// import postsRouter from './routers/posts';
// import usersRouter from './routers/users';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/meetups', meetupsRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/badgestatuses', badgeStatusesRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/assetposts', assetPostsRouter);
app.use('/api/rolls', rollsRouter);
app.use('/api/libraries', librariesRouter);
app.use('/api/rollAndAssetRelationships', rollAndAssetRelationshipsRouter);
app.use('/api/libraryanduserrelationships', libraryAndUserRelationshipsRouter);
app.use('/api/pastmeetupanduserrelationships', pastMeetupAndUserRelationshipsRouter);
app.use('/api/badgeanduserrelationships', badgeAndUserRelationshipsRouter);
app.use('/api/assetanduserrelationships', assetAndUserRelationshipsRouter);
app.use('/api/libraryandassetrelationships', libraryAndAssetRelationshipsRouter);
app.use('/api/loungechatandchatroomrelationships', loungeChatAndChatRoomRelationshipsRouter);
app.use('/api/assetpostandreactionanduserrelationships', assetPostAndReactionAndUserRelationshipsRouter);

export default app;
