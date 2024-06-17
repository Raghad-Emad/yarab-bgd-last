const mysql = require("mysql");
const util = require("util");

if (process.env.NODE_ENV != "production") {
   require("dotenv").config({ path: "./.env" });
}

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});

// Promisify the query method for async/await
pool.query = util.promisify(pool.query);

module.exports = pool;
