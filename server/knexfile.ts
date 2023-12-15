import path from 'path';

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port: 3306,
      user : 'admin',
      password : 'iemf',
      database: 'ecoleta'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
  }
};