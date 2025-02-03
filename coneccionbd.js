const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'joyas',
  password: 'lara1996',
  port: 5432,
});

module.exports = pool;