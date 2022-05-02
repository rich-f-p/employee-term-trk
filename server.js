const ct = require('console.table');
const inquire = require('inquirer');
const mySql = require('mysql2');

// function for console.log
function cl(log){
    console.log(log);
};

const my = mySql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password123',
        database: 'emply_db'
    }
);

//function that will return all saved departments in the database
function getDepartment(){
    const department = `SELECT * FROM department;`
    my.query(department,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
        }
    )
};

