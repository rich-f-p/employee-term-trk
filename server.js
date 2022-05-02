const ct = require('console.table');
const inquire = require('inquirer');
const mySql = require('mysql2');

const my = mySql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password123',
        database: 'emply_db'
    }
)
