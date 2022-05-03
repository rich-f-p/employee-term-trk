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

function viewEmployees(){
    const view = `SELECT * FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id;`
    my.query(view,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
            console.table(results);
            init();
        }
    )
}

async function getDep(tag){
    my.query(`SELECT * FROM department;`,
    function(err,results,fields){
        if(err){
            //cl(err)
        }else{
    //const id = results.filter(data => data.dep_name === tag)[0].id;
    //cl(id[0].id)
    return id ;
    }
})}
/**
 * add function to allow the user to add a new role to the database
 * @param {string} title 
 * @param {string} salary 
 * @param {string} department 
 */
async function addRole(){
    const role = await askrole();
    //const get = await getDep(role.roleDep);
    cl(role)
    //cl(get);
    my.query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.roleName}',${role.roleSalary},NULL);`,
        function(err,results,fields){
            if(err){
                cl(err);              
            }
        }
    )
}
// let hi = getDep('legal')
 //addRole('legal','dep','100');

//test();
// viewEmployee();




function checkChoice(ac){
    switch (ac){
        case 'add employee':
            console.log('addemp');
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case 'update employee role':
            //update role
            break;
        case 'view all departments':
            getDepartment();
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'add department':
            addDepartment();
            break;
        case 'add a role':
            addRole();
            break;
    }

}

function init(){
    inquire.prompt(menu).then((data)=>{
        checkChoice(data.menu)
    })
}
init();