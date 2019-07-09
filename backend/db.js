const mysql = require('mysql');
const config = require('./config.js');
const db = mysql.createConnection({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  timezone: config.db.timezone
});

db.connect(function (err){
  if(err) throw err;
});

module.exports = db;