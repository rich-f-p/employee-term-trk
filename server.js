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
// function to view roles and their correlating department
function viewRoles(){
    const roles = `SELECT * FROM role JOIN department ON role.department_id=department.id;`;
    my.query(roles,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
        }
    )
};
// function that will allow the user to add a department to the department table.
//passes a string through the function
function addDepartment(dep){
    const add = `INSERT INTO department (dep_name) VALUES ('${dep}');`;
    my.query(add,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
        }
    )
};
/**
 * add function to allow the user to add a new role to the database
 * @param {string} title 
 * @param {string} salary 
 * @param {string} department 
 */
function addRole(title,salary,department){
    const newDep = getDep(department);
    const add = `INSERT INTO role (title, salary, department_id) VALUES ('${title}',${salary},${newDep});`
    my.query(add,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
        }
    )
}



//test();
// viewEmployee();