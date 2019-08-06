import express from 'express';
import Joi from 'joi';
import {ValidationError} from '../../core/errors';
import playerService from '../../services/internal/player/player-service';

const app = express();

app.get('/:id' , async (req, res) => {
  const {value:id, error} = Joi.validate(req.params.id, Joi.string().guid({ version: [
      'uuidv4'
    ]}));

  if (error) {
    throw new ValidationError(error.message);
  }

  const player = await playerService.getOne(id);
  res.json(player);
});

export default app;