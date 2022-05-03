const inquire = require('inquirer');
const dbSql = require('mysql2')
const db = dbSql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        //password may vary depending on the user
        password: 'password123',
        database: 'emply_db'
    }
);
//menu questions
const menu = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'menu',
    choices: ['view all employees','add employee','update employee role','view all departments',
    'view all roles','add department','add a role']
}];

const addDepartment =[{
    type:'input',
    message:'what is the name of the department you would like to add?',
    name: 'addDepartment'
}]
function qaAddDep(){
    inquire.prompt(addDepartment).then((data) =>{
        console.log('Department has been added')
    }).catch((error) => {
        if(error){
            console.log(error)
        }
    })
}

// add function to populate the choices available in the qa list
choices =[];
function qaRole(){
db.query(`SELECT dep_name FROM department;`,
function(err,results,fields){
    if(err){
        console.log(err);
    }else{

        for(i=0;i<results.length;i++){
            choices.push(results[i].dep_name);
        }
    }
})
};
//questions to add a role
const qa = [{
    type: 'input',
    message: 'What is the name of the role?',
    name: 'roleName',
},{
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'roleSalary',
},{
    type: 'list',
    message: 'Which department does the role belong to?',
    name: 'roleDep',
    choices: choices
}];
// starts the questions for creating a new role.
function askrole(){
    qaRole();
    inquire.prompt(qa).then((data) =>{
        console.log('Role has been added')
    }).catch((error) => {
        if(error){
            console.log(error)
        }
    })
}
//variable that will be used when the user wants to input new employee data
var roleChoicesA = [];
var manChoices = [];
//function to populate the rolesChoicesA array which display the choices for possible roles to the user
function empQaRole(){
db.query(`SELECT * FROM role;`,
function(err,results,fields){
    if(err){
        console.log(err);
    }else{

        for(i=0;i<results.length;i++){
            roleChoicesA.push(results[i].title);
        }
    }
})
};

//function to populate the manager choices available to the user
function empQaMan(){
    //grab table data
    db.query(`SELECT concat(first_name,' ',last_name) as Name FROM employee WHERE manager_id IS NULL;`,
    function(err,results,fields){
        if(err){
            console.log(err);
        }else{
            // push data to array
            for(i=0;i<results.length;i++){
                manChoices.push(results[i].Name);
            }
        }
    })
}
//question to ask user when creating a new employee
const qaEmployee = [{
    type: 'input',
    message: 'What is the first name of the employee?',
    name: 'firstEmp',
},{
    type: 'input',
    message: 'What is the last name of the employee?',
    name: 'lastEmp',
},{
    type: 'list',
    message: "What is the employee's role?",
    name: 'roleEmp',
    choices: roleChoicesA
},{
    type: 'list',
    message: 'who is the employee manager?',
    name: 'managerEmp',
    choices: manChoices
}]
// function to initiate the process of inputting new employee information
function inQaEmp(){
    empQaMan();
    empQaRole();
    inquire.prompt(qaEmployee).then((data) =>{
        console.log('Employee has been added')
    }).catch((error) => {
        if(error){
            console.log(error)
        }
    })
}
//array of employee names
var availEmp =[];
//selects all of the employee names
function popUpRole(){
    db.query(`SELECT concat(first_name,' ',last_name) as Name FROM employee;`,
    function(err,results,fields){
        if(err){
            console.log(err);
        }else{
            // push data to array
            for(i=0;i<results.length;i++){
                availEmp.push(results[i].Name);
            }
        }
    })
}
//questions to update employee role
const updateQa =[{
    type:'input',
    message:'please press the enter key',
    name: 'hold'

},{
    type:'list',
    message: 'Which employee role do you want to update?',
    name: 'updateEmp',
    choices: availEmp
},{
    type:'list',
    message: 'Which role would you like to assign to the employee?',
    name: 'updatedRole',
    choices: roleChoicesA
}]
// function to initiate the process of updating an employee role
async function updateEmp(){
    await popUpRole();
    await empQaRole();
    inquire.prompt(updateQa).then((data) =>{
        console.log('Employee role has been updated')
    }).catch((error) => {
        if(error){
            console.log(error)
        }
    })
}

module.exports = {menu,askrole,inQaEmp,updateEmp,qaAddDep}
