import db from '../../../core/db';

export default {
  async getOne(id) {
    const client = await db.connect();
    try {
      const reply = (await client.query(`
        select
          player.id,
          player.last_seen,
          player.display_name,
          player.email,
          player.created_date,
          g.id as game_id,
          g.name as game_name,
          g.slug as game_slug,
          g.created_date as game_created_at,
          g.publisher_id as game_founder_id,
          f.name as game_founder_name,
          f.slug as game_founder_slug,
          f.created_date as game_founder_created_at,     
          g.developer_id as game_lead_developer_id,
          l.name as game_lead_name,
          l.slug as game_lead_slug,
          l.created_date as game_lead_created_at,     
          d.id as developer_id,
          d.slug as developer_slug,
          d.name as developer_name,
          d.created_date as developer_created_at,
          p.name as publisher_name,
          p.slug as publisher_slug,
          p.id as publisher_id,
          p.created_date as publisher_created_at     
        from player
        left join player_game pg on player.id = pg.player_id
        left join game g on pg.game_id = g.id
        left join game_developer gd on g.id = gd.game_id
        left join developer d on gd.developer_id = d.id
        left join game_publisher gp on g.id = gp.game_id
        left join publisher p on gp.publisher_id = p.id
        left join publisher f on g.publisher_id = f.id
        left join developer l on g.developer_id = l.id
        where player.id = $1
      `, [id])).rows;

      return this._renderPlayer(reply);
    } finally {
      await client.release();
    }
  },

  _renderPlayer(rows) {
    return rows.reduce((acc, record) => {
      acc.name = record.name;
      acc.id = record.id;
      acc.displayName = record.display_name;
      acc.email = record.email;
      acc.lastSeen = record.last_seen;
      acc.createdAt = record.created_at;

      const game = {
        id: record.game_id,
        name: record.game_name,
        slug: record.game_slug,
        createdAt: record.game_created_at,
        founder: {
          id: record.game_founder_id,
          name: record.game_founder_name,
          slug: record.game_founder_slug,
          createdAt: record.game_founder_created_at
        },
        leadDeveloper: {
          id: record.game_lead_developer_id,
          name: record.game_lead_name,
          slug: record.game_lead_slug,
          createdAt: record.game_lead_created_at
        }
      };

      const publisher = {
        id: record.publisher_id,
        name: record.publisher_name,
        slug: record.publisher_slug,
        createdAt: record.publisher_created_at
      };

      const developer = {
        id: record.developer_id,
        name: record.developer_name,
        slug: record.developer_slug,
        createdAt: record.developer_created_at
      };

      const parsedGame = acc.games && acc.games.find(storedGame => storedGame.id === game.id);

      if (!parsedGame) {
        acc.games = acc.games || [];

        game.developers = developer.id ? [developer] : [];
        game.publishers = publisher.id ? [publisher] : [];

        acc.games.push(game);
        return acc;
      }

      if (!parsedGame.developers.some(dev => dev.id === developer.id) && developer.id) {
        parsedGame.developers.push(developer);
      }

      if (!parsedGame.publishers.some(pub => pub.id === publisher.id) && publisher.id) {
        parsedGame.publishers.push(publisher);
      }

      return acc;
    }, {})
  }
}