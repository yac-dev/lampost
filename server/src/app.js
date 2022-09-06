import express from 'express';
import cors from 'cors';
import './databases/mongoose';

// routers
import authRouter from './routers/auth';
import meetupsRouter from './routers/meetups';
import badgeElementsRouter from './routers/badgeElements';
// import postsRouter from './routers/posts';
// import usersRouter from './routers/users';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/meetups', meetupsRouter);
app.use('/api/badgeelements', badgeElementsRouter);
// app.use('/api/posts', postsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/polls', pollsRouter);
// app.use('/api/votes', votesRouter);

export default app;
