import knex from 'knex';

const connection = knex({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    port: 3306,
    user : 'admin',
    password : 'iemf',
    database: 'ecoleta'
  },
    useNullAsDefault: true
});

export default connection;



// Migrations = Histórico do banco de dados