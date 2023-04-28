import express from 'express';
import cors from 'cors';
import './databases/mongoose';

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
import libraryAndAssetRelationshipsRouter from './routers/libraryAndAssetRelationships';
import loungeChatsRouter from './routers/loungeChats';
import friendChatsRouter from './routers/friendChats';
import launcherAndPatronRelationshisRouter from './routers/launcherAndPatronRelationshis';
import followRelationshipsRouter from './routers/followRelationships';

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
app.use('/api/libraryandassetrelationships', libraryAndAssetRelationshipsRouter);
app.use('/api/loungechats', loungeChatsRouter);
app.use('/api/friendchats', friendChatsRouter);
app.use('/api/launcherandpatronrelationships', launcherAndPatronRelationshisRouter);
app.use('/api/followrelationships', followRelationshipsRouter);
app.use('/api/lab', labRouter);

// app.use(globalErrorHandler);

export default app;
