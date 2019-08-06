import './core/express-promise';
import './services/external/deep-tought/stubs';
import './services/external/magic-eight/stubs';
import './services/external/wasserman/stubs';

import express from 'express';
import logger from './core/logger';

import registerRoutes from './api';

const app = express();
const port = 3000;

registerRoutes(app);

app.set('server', app.listen(port, () => logger.info(`App listening on port ${port}!`)));
