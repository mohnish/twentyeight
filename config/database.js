// Contains all the information about your database
var mysql = require('mysql');

// Database configuration
var user = '';
var password = '';
var database = '';
var host = '';

// Class to encapsulate the mysql object and
// to create a mysql client
var MysqlConfig = function(mysql) {
  this.mysql = mysql;
  this.client = mysql.createClient({
    user: user,
    password: password,
    database: database,
    host: host
  });
}

exports.database = new MysqlConfig(mysql);