const ct = require('console.table');
const inquire = require('inquirer');
const mySql = require('mysql2');
const {menu,askrole,qaAddDep,empQaMan,empQaRole,qaEmployee,popUpRole,updateQa} = require('./Assets/inquire')

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
    const department = `SELECT id,dep_name AS Department FROM department;`
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
    const roles = `SELECT role.id AS ID,role.title AS Title,role.salary As Salary,department.dep_name As Department FROM role JOIN department ON role.department_id=department.id;`;
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
    const view = `SELECT employee.id,concat(first_name,' ',last_name) AS Name ,role.title AS Title,role.salary AS Salary,department.dep_name AS Department FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id ORDER BY employee.id;`
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

/**
 * add function to allow the user to add a new role to the database
 * @param {string} title 
 * @param {string} salary 
 * @param {string} department 
 */
function addRole(){
askrole().then((data)=>{
    my.query(`SELECT * FROM department;`,
    function(err,results,fields){
        if(err){
        }
    for(i=0;i<results.length;i++){
        if(results[i].dep_name===data.roleDep){
            var dep = results[i].id;
            my.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.roleName}',${data.roleSalary},${dep});`,
        function(err,results,fields){
            if(err){
                cl(err);              
            }init();
})}}})})}
// Function that will initiate when the user wants to add employee
function inQaEmp(){
    //populate array of choices
    empQaMan();
    empQaRole();
    inquire.prompt(qaEmployee).then((data) =>{
        my.query(`SELECT * FROM role;`,
        function(err,results){
            if(err){cl(err);}else{
                for(i=0;i<results.length;i++){
                    var role;
                if(results[i].title===data.roleEmp){
                    //set variable role to id number of correlating role answer
                    role = results[i].id;
                }}}
        my.query(`SELECT id,concat(first_name,' ',last_name) as Name FROM employee;`,
        function(err,empresults){
            if(err){cl(err);}else{
            for(i=0;i<empresults.length;i++){
                var manager;
                if(empresults[i].Name === data.managerEmp){
                    //set variable role to id number of correlating manager answer
                    manager = empresults[i].id
my.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstEmp}','${data.lastEmp}',${role},${manager});`)
    }}}})})
    console.log('Employee has been added')
    //start menu function
    init();
}).catch((error) => {if(error){console.log(error)}})}

function updateEmp(){
    popUpRole();
    empQaRole();
    inquire.prompt(updateQa).then((data) =>{
        console.log(data)
        my.query(`SELECT * FROM role;`,
        function(err,results){
            if(err){cl(err);}else{
                for(i=0;i<results.length;i++){
                    var roleId;
                if(results[i].title===data.updatedRole){
                    //set variable role to id number of correlating role answer
                    roleId = results[i].id;
                }}}
        my.query(`SELECT id,concat(first_name,' ',last_name) as Name FROM employee;`,
        function(err,empresults){
            if(err){cl(err);}else{
            for(i=0;i<empresults.length;i++){
                var nameId;
                if(empresults[i].Name === data.updateEmp){
                    //set variable role to id number of correlating manager answer
                    nameId = empresults[i].id
my.query(`UPDATE employee SET role_id='${roleId}'  WHERE id = '${nameId}';`)
    }}}})})
    console.log('Employee role has been updated')
    init();
    }).catch((error) => {
        if(error){
            console.log(error)
        }
    })
}

function checkChoice(ac){
    switch (ac){
        case 'add employee':
            inQaEmp();
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case 'update employee role':
            updateEmp();
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
        case 'quit':
            cl('press Ctrl+c')
            break;
    }

}

function init(){
    inquire.prompt(menu).then((data)=>{
        checkChoice(data.menu)
    })
}
cl(` _____                 _                         _                  _              
| ____|_ __ ___  _ __ | | ___  _   _  ___  ___  | |_ _ __ __ _  ___| | _____ _ __  
|  _| | '_ " _  | '_  | |/ _  | | | |/ _  / _  || __| '__/ _" |/ __| |/ / _ | '__|
| |___| | | | | | |_) | | (_) | |_| |  __/  __/ | |_| | | (_| | (__|   <  __/ |   
|_____|_| |_| |_| .__/|_| ___/| __, |____|____| |___|_| |___,_|____|_|__|___|_|   
                |_|            |___/                                              `)
init();