import express from 'express';

const app = express();

app.get('/', async (req, res) => res.json({external: 'ok'}));

export default app;