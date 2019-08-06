import express from 'express';
import deepThoughtService from '../../services/external/deep-tought/deep-thought-service';
import magicEightService from '../../services/external/magic-eight/magic-eight-service';
import wassermanService from '../../services/external/wasserman/wasserman-service';

const app = express();

app.get('/', async (req, res) => {
  const tracingId = req.headers['request-id'];

  let deepThoughtResponse;
  let magicEightResponse;
  let wassermanResponse;

  try {
    deepThoughtResponse = {success: true, ...await deepThoughtService.askMainQuestion(tracingId, req.query.deepThought)};
  } catch (err) {
    deepThoughtResponse = {success: false};
  }

  try {
    magicEightResponse = {success: true, ...await magicEightService.askMagicEight(tracingId, req.query.magicEight)};
  } catch (err) {
    magicEightResponse = {success: false};
  }

  try {
    wassermanResponse = {success: true, ...await wassermanService.askAnatolyWasserman(tracingId, req.query.wasserman)};
  } catch (err) {
    wassermanResponse = {success: false};
  }

  res.json({
    deepThought: deepThoughtResponse,
    magicEight: magicEightResponse,
    wasserman: wassermanResponse
  })
});

export default app;