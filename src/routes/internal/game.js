import express from 'express';
import Joi from 'joi';
import gameService from '../../services/internal/game/game-service';
import {ValidationError} from '../../core/errors';

const app = express();
const joiName = Joi.string().min(3).max(64);
const joiSlug = Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3).max(64);
const joiGuidOrEntry = Joi.alternatives().try([
  Joi.string().guid({ version: [
      'uuidv4'
    ]}),
  Joi.object().keys({
    name: joiName,
    slug: joiSlug
  })
]);

const joiOptions = {
  presence: 'required',
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: true
};

app.get('/:id' , async (req, res) => {
  const {value:id, error} = Joi.validate(req.params.id, Joi.string().guid({ version: [
      'uuidv4'
    ]}));

  if (error) {
    throw new ValidationError(error.message);
  }

  const game = await gameService.getOne(id);
  if (!game) {
    return res.status(404).json({code: 'GAME_NOT_FOUND', message: 'Not Found'});
  }

  res.json(game);
});

app.get('/' , async (req, res) => {
  const {value:query, error} = Joi.validate(req.query, Joi.object().keys({
    limit: Joi.number().integer().positive().min(1).max(100).default(10),
    offset: Joi.number().integer().positive().min(0).default(0)
  }).options({
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  }));

  if (error) {
    throw new ValidationError(error.message);
  }

  const games = await gameService.getAll({limit: query.limit, offset: query.offset});
  res.json(games);
});

app.post('/' , async (req, res) => {
  const {value:payload, error} = Joi.validate(req.body, Joi.object().keys({
    name: joiName,
    slug: joiSlug,
    leadDeveloper: joiGuidOrEntry,
    founder: joiGuidOrEntry
  }).options(joiOptions));

  if (error) {
    throw new ValidationError(error.message);
  }

  try {
    const game = await gameService.addOne(payload);
    res.status(201).json(game);
  } catch (err) {
    if (err instanceof GameServiceError) {
      return res.status(400).json({code: err.code, message: err.message});
    }

    throw err;
  }
});

app.patch('/:id' , async (req, res) => {
  const {value:id, error:invalidIdError} = Joi.validate(req.params.id, Joi.string().guid({ version: [
      'uuidv4'
    ]}));

  if (invalidIdError) {
    throw new ValidationError(invalidIdError.message);
  }

  const {value:payload, error} = Joi.validate(req.body, Joi.object().keys({
    name: joiName.optional(),
    slug: joiSlug.optional(),
  }).options(joiOptions));

  if (error) {
    throw new ValidationError(error.message);
  }

  try {
    const game = await gameService.updateOne(id, payload);

    if (!game) {
      return res.status(404).json({code: 'GAME_NOT_FOUND', message: 'Not Found'});
    }

    res.json(game);
  } catch (err) {
    if (err instanceof GameServiceError) {
      return res.status(400).json({code: err.code, message: err.message});
    }

    throw err;
  }
});

app.delete('/:id' , async (req, res) => {
  const {value:id, error} = Joi.validate(req.params.id, Joi.string().guid({ version: [
      'uuidv4'
    ]}));

  if (error) {
    throw new ValidationError(error.message);
  }

  try {
    const result = await gameService.removeOne(id);
    res.status(202).json(result);
  } catch (err) {
    if (err instanceof GameServiceRestrictionError) {
      return res.status(409).json({code: err.code, message: err.message});
    }

    throw err;
  }
});

export default app;