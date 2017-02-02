require('dotenv').config();
const data = require('./data_access')

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    ssl      : process.env.DB_SSL
  },
});

const q = `
  SELECT * FROM users_maps
  JOIN users ON (users.id = users_maps.user_id)
  WHERE users_maps.map_id = 4
`;

const m = `
  SELECT * FROM markers
  WHERE map_id = 4
`
data.query(q, (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
   console.log(result.rows)
   process.exit();
});


