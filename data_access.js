const pg = require('pg');
require('dotenv').config();

const client = new pg.Client({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
});

const queryDB = (q, params, cb) => {
  client.connect((err) =>{
    if (err) {
      return console.error("error", err);
    }
    client.query(q, params, cb)
  })
};

module.exports = {
  query: queryDB
};
