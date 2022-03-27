// Update with your config settings.
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  development: {
    client: 'postgresql',
    connection: {
      database: 'Cookbook_WBS',
      user: 'thomas',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  elephant: {
    client: 'postgresql',
    connection: `postgres://zzehrzmh:${process.env.DB_ELEPHANT_PW}@balarama.db.elephantsql.com/zzehrzmh`,
    pool: {
      min: 2,
      max: 5,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
