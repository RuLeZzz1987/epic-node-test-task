import express from 'express';

const app = express();

app.get('/:id' , async (req, res) => { res.json({getOne: 'ok'}) });

app.get('/' , async (req, res) => { res.json({getAll: 'ok'}) });

app.post('/' , async (req, res) => { res.json({create: 'ok'}) });

app.patch('/:id' , async (req, res) => { res.json({update: 'ok'}) });

app.delete('/:id' , async (req, res) => { res.json({delete: 'ok'}) });

export default app;