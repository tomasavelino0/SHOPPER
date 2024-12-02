import { Options } from 'sequelize';

const config: Options = {
  dialect: 'postgres',
  host: 'dpg-ct6sflg8fa8c739hf7mg-a.ohio-postgres.render.com',
  port: 5432,
  username: 'tomas',
  password: 'uKQMIzrvGLKaIN6U01STbbGUR0eUru0l',
  database: 'banco_tomas',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = config;
