const ct = require('console.table');
const inquire = require('inquirer');
const mySql = require('mysql2');
const {menu,askrole,inQaEmp,updateEmp,qaAddDep} = require('./Assets/inquire')

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
            init();
        }
    )
};
// function to view roles and their correlating department
function viewRoles(){
    const roles = `SELECT * FROM role JOIN department ON role.department_id=department.id;`;
    my.query(roles,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
            init()
        }
    )
};
// function that will allow the user to add a department to the department table.
//passes a string through the function
async function addDepartment(){
    const dep = await qaAddDep();
    const add = `INSERT INTO department (dep_name) VALUES ('${dep.addDepartment}');`;
    my.query(add,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
        }
    )
    init();
};

