// Contains all the information about your database
var mysql = require('mysql');

// Database configuration
var user = 'root';
var password = 'foo';
var database = 'twenty8';
var host = 'localhost';

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