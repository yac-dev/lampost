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
app.use('/api/medias', assetsRouter);
// app.use('/api/posts', postsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/polls', pollsRouter);
// app.use('/api/votes', votesRouter);

export default app;
