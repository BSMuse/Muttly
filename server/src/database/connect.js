const {Pool} = require("pg");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};


// Strip password from config for logging
const {password, ...conf} = config;
console.log("Database Config:", conf);
const pool = new Pool(config);

pool.connect()
  .then((conn) => {
    const {host, database, user} = conn.connectionParameters;
    console.log("Database Conected:", {host, user, database});
  })
  .catch(err => console.log("database connection failed:", err.message));

/*

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "INSERT_YOUR_POSTGRES_URL_HERE" //Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});


*/


module.exports = pool;