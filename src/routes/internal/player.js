import express from 'express';

const app = express();

app.get('/:id' , async (req, res) => { res.json({getOne: 'ok'}) });

export default app;