import express from 'express';
import cors from 'cors';
import './databases/mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// routers
// import { globalErrorHandler } from './controllers/globalErrors';
import labRouter from './routers/labs';
import authRouter from './routers/auth';
import usersRouter from './routers/users';
import userBlockingRelationshipsRouter from './routers/userBlockingRelationships';
import meetupsRouter from './routers/meetups';
import iconsRouter from './routers/icons';
import badgesRouter from './routers/badges';
import badgeAndUserRelationshipsRouter from './routers/badgeAndUserRelationships';
import badgeIndexesRouter from './routers/badgeIndexes';
import commentsRouter from './routers/comments';
import assetsRouter from './routers/assets';
import librariesRouter from './routers/libraries';
import reportsRouter from './routers/reports';
import impressionsRouter from './routers/impressions';
import meetupAndUserRelationshipsRouter from './routers/meetupAndUserRelationships';
import friendRelationshipsRouter from './routers/friendRelationships';
import libraryAndUserRelationshipsRouter from './routers/libraryAndUserRelationships';
import badgeTypeAndBadgeRelationshipsRouter from './routers/badgeTypeAndBadgeRelationships';
import iconAndIconTypeRelationshipsRouter from './routers/iconAndIconTypeRelationships';
import libraryAndAssetRelationshipsRouter from './routers/libraryAndAssetRelationships';
import loungeChatsRouter from './routers/loungeChats';
import friendChatsRouter from './routers/friendChats';
import launcherAndPatronRelationshisRouter from './routers/launcherAndPatronRelationshis';
import followRelationshipsRouter from './routers/followRelationships';
import notificationsRouter from './routers/notifications';
import reactionIconsRouter from './routers/reactionIcons';

// import postsRouter from './routers/posts';
// import usersRouter from './routers/users';
console.log(__dirname);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/badgeImages', express.static(path.join(__dirname, '..', 'badgeImages')));
app.use('/reactionIconImages', express.static(path.join(__dirname, '..', 'reactionIconImages')));

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/userblockingrelationships', userBlockingRelationshipsRouter);
app.use('/api/meetups', meetupsRouter);
app.use('/api/icons', iconsRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/badgeanduserrelationships', badgeAndUserRelationshipsRouter);
app.use('/api/badgeindexes', badgeIndexesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/impressions', impressionsRouter);
app.use('/api/libraries', librariesRouter);
app.use('/api/libraryanduserrelationships', libraryAndUserRelationshipsRouter);
app.use('/api/meetupanduserrelationships', meetupAndUserRelationshipsRouter);
app.use('/api/friendrelationships', friendRelationshipsRouter);
app.use('/api/badgetypeandbadgerelationships', badgeTypeAndBadgeRelationshipsRouter);
app.use('/api/iconandicontyperelationships', iconAndIconTypeRelationshipsRouter);
app.use('/api/libraryandassetrelationships', libraryAndAssetRelationshipsRouter);
app.use('/api/loungechats', loungeChatsRouter);
app.use('/api/friendchats', friendChatsRouter);
app.use('/api/launcherandpatronrelationships', launcherAndPatronRelationshisRouter);
app.use('/api/followrelationships', followRelationshipsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/lab', labRouter);
app.use('/api/reactionicons', reactionIconsRouter);

// app.use(globalErrorHandler);

export default app;
