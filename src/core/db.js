import { Pool } from 'pg';
import logger from './logger';

class DbClientFactory {

  constructor() {
    this._pool = new Pool({
      user: 'postgres',
      host: 'postgres-test',
      database: 'rest_service',
      password: 'postgres',
    });

    this._pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

  }

  async connect() {
    const client = await this._pool.connect();
    client.query = new Proxy(client.query, {
      apply: async (target, thisArg, argArray) => {
        logger.debug({query: argArray[0]});
        return target.apply(thisArg, argArray);
      }
    });

    return client;
  }


}

export default new DbClientFactory();