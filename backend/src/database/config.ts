import { Options } from 'sequelize';

const config: Options = {
  dialect: 'postgres',
  host: 'dpg-csidis5ds78s73eorek0-a.ohio-postgres.render.com',
  port: 5432,
  username: 'mesa_db_user',
  password: 'ksHfbmWoibczgJCGnBLPckGXrMM6SrMT',
  database: 'mesa_db',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = config;
