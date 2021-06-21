const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "Dml2009123abc",
  host: "localhost",
  port: 5432,
  database: "bd_universidade"
});

module.exports = pool;