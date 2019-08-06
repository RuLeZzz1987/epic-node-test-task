import './core/express-promise';
import './services/external/deep-tought/stubs';
import './services/external/magic-eight/stubs';
import './services/external/wasserman/stubs';

import express from 'express';
import { Pool } from 'pg';
import logger from './core/logger';

import registerRoutes from './api';

const app = express();
const port = 3000;

function connectDb() {
  const pool = new Pool({
    user: 'postgres',
    host: 'postgres-test',
    database: 'rest_service',
    password: 'postgres',
  });
  
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
  
  return pool;
}

app.set('db', connectDb());

registerRoutes(app);

app.set('server', app.listen(port, () => logger.info(`App listening on port ${port}!`)));
