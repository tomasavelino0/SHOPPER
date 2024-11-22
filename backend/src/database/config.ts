import { Options } from 'sequelize';

const config: Options = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 3004,
  username: 'tomas',
  password: 'password',
  database: 'wppApi',
};

module.exports = config;