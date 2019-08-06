import express from 'express';
import whatEver from './what-ever';

const app = express();

app.use('/what-ever', whatEver);

export default app;