var mysql = require('mysql');

//local mysql db connection
var dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'demo'
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
