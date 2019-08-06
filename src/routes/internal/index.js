import express from 'express';
import gameRouter from './game';
import playerRouter from './player';

const app = express();

app.use('/games', gameRouter);
app.use('/players', playerRouter);

export default app;