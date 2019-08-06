import db from '../../../core/db';
import {GameServicePayloadError, GameServiceRestrictionError} from "./errors";

const gameQuery = `
select 
            game.id, 
            game.name, 
            game.slug, 
            game.created_date as created_at,
            developer.id as developer_id,
            developer.slug as developer_slug,
            developer.name as developer_name,
            developer.created_date as developer_created_at,
            publisher.id as publisher_id,
            publisher.slug as publisher_slug,
            publisher.name as publisher_name,
            publisher.created_date as publisher_created_at
        from 
           game 
        left join developer on developer.id = game.developer_id
        left join publisher on publisher.id = game.publisher_id
        `;

export default {
  async getOne(id) {
    const client = await db.connect();
    try {
      const reply = (await client.query(
        `${gameQuery}
        where game.id = $1
        limit 1
        `, [id])).rows[0];

      if (!reply) {
        return;
      }

      return this._processGame(reply);
    } finally {
      await client.release();
    }
  },

  async getAll({limit = 10, offset = 0}) {
    const client = await db.connect();
    try {
      const reply = (await client.query(
        `${gameQuery}
      limit $1 offset $2
      `, [limit, offset])).rows;

      return reply.map(this._processGame);
    } finally {
      await client.release();
    }
  },

  async addOne(game) {
    const client = await db.connect();
    try {
      await client.query(`begin`);
      let leadDeveloper;
      let founder;
      let persistedGameReply;

      if (game.leadDeveloper instanceof Object) {
        try {
          leadDeveloper = (await client.query(`
              insert into developer (slug, name)
              values ($1, $2) returning *
          `, [game.leadDeveloper.slug, game.leadDeveloper.name])).rows[0];
        } catch (err) {
          if (err.message.includes('unique constraint "developer_slug_key"')) {
            throw new GameServicePayloadError('LEAD_ENGINEER_SLUG_ERROR', 'lead engineer with provided slug already exists');
          }

          throw err;
        }
      } else {
        leadDeveloper = (await client.query(`
          select id, name, slug, created_date from developer where id = $1
        `, [game.leadDeveloper])).rows[0];
      }

      if (game.founder instanceof Object) {
        try {
          founder = (await client.query(`
              insert into publisher (slug, name)
              values ($1, $2) returning *
          `, [game.founder.slug, game.founder.name])).rows[0];
        } catch (err) {
          if (err.message.includes('unique constraint "publisher_slug_key"')) {
            throw new GameServicePayloadError('FOUNDER_SLUG_ERROR', 'founder with provided slug already exists');
          }

          throw err;
        }
      } else {
        founder = (await client.query(`
          select id, name, slug, created_date from publisher where id = $1
        `, [game.founder])).rows[0];
      }

      if (!founder) {
        throw new GameServicePayloadError('FOUNDER_ERROR', 'provided invalid founder details');
      }

      if (!leadDeveloper) {
        throw new GameServicePayloadError('LEAD_ENGINEER_ERROR', 'provided invalid lead engineer details')
      }

      try {
        persistedGameReply = (await client.query(`
            insert into game (developer_id, publisher_id, name, slug)
            values ($1, $2, $3, $4) returning *
        `, [leadDeveloper.id, founder.id, game.name, game.slug])).rows[0];
      } catch (err) {
        if (err.message.includes('unique constraint "game_slug_key"')) {
          throw new GameServicePayloadError('GAME_SLUG_ERROR', 'provided game slug already exists');
        }

        throw err;
      }

      await client.query('commit');

      return {
        id: persistedGameReply.id,
        name: persistedGameReply.name,
        slug: persistedGameReply.slug,
        createdAt: persistedGameReply.created_date,
        leadDeveloper: {
          id: leadDeveloper.id,
          name: leadDeveloper.name,
          slug: leadDeveloper.slug,
          createdAt: leadDeveloper.created_date
        },
        founder: {
          id: founder.id,
          name: founder.name,
          slug: founder.slug,
          createdAt: founder.created_date
        }
      }

    } catch (err) {
      client.query('rollback');
      throw err;
    } finally {
      await client.release();
    }
  },

  async updateOne(id, game) {
    const client = await db.connect();
    try {
      const queryArgs = [];

      let query = `update game set `;
      if (game.name) {
        queryArgs.push(game.name);
        query += `name = $${queryArgs.length} `;
      }
      if (game.slug) {
        queryArgs.push(game.slug);
        query += `${queryArgs.length ? ',' : ''} slug = $${queryArgs.length} `;
      }

      if (queryArgs.length) {
        queryArgs.push(id);
        query += `where id = $${queryArgs.length}`;

        await client.query(query, queryArgs);
      }

      return this.getOne(id);
    } catch (err) {

      throw err;
    } finally {
      await client.release();
    }
  },

  async removeOne(id) {
    const client = await db.connect();
    try {
      await client.query(`delete from game where id = $1`, [id]);
    } catch (err) {
      if (err.message.includes('foreign key constraint "player_game_game_id_fkey"')) {
        throw new GameServiceRestrictionError('GAME_SERVICE_RESTRICTION_PLAYER_DEPENDENCY_ERROR', 'Can not remove game while players use it');
      }
      if (err.message.includes('foreign key constraint "game_developer_game_id_fkey"')) {
        throw new GameServiceRestrictionError('GAME_SERVICE_RESTRICTION_DEVELOPER_DEPENDENCY_ERROR', 'Can not remove game while developers assigned to it');
      }
      if (err.message.includes('foreign key constraint "game_publisher_game_id_fkey"')) {
        throw new GameServiceRestrictionError('GAME_SERVICE_RESTRICTION_PUBLISHER_DEPENDENCY_ERROR', 'Can not remove game while publishers assigned to it');
      }

      throw err;
    } finally {
      await client.release();
    }
  },

  _processGame({id, slug, name, created_at:createdAt, ...rest}) {
    return {
      id,
      name,
      slug,
      createdAt,
      leadDeveloper: {
        id: rest.developer_id,
        slug: rest.developer_slug,
        name: rest.developer_name,
        createdAt: rest.developer_created_at
      },
      founder: {
        id: rest.publisher_id,
        slug: rest.publisher_slug,
        name: rest.publisher_name,
        createdAt: rest.publisher_created_at
      }
    }
  }
}