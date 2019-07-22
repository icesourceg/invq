const fs = require('fs');

module.exports = 
{
  "development": {
    "username": "root",
    "password": "r00t123",
    "database": "invqdb",
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": "r00t123",
    "database": "invqdb",
    "host": "127.0.0.1",
    "dialect": "mysql"    
  },
  "production": {
    "username": "invqdbuser",
    "password": "invqdb-#201908!",
    "database": "invqdb",
    "host": "165.22.245.109",
    "dialect": "mysql",
    "logging": false
  }
}

