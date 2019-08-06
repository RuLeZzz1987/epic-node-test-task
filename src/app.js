import './core/express-promise';
import express from 'express';
import { Pool } from 'pg';

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

app.listen(port, () => console.log(`App listening on port ${port}!`));
