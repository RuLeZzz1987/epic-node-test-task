import db from '../../../core/db';

export default {
  async getOne(id) {
    const client = await db.connect();
    try {
      return {id};
    } finally {
      await client.release();
    }
  },

}