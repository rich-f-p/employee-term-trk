const inquire = require('inquirer');
const dbSql = require('mysql2')
const db = dbSql.createConnection(
    {
        host: 'localhost',
        user: 'root',
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

function askrole(){
    qaRole();
    inquire.prompt(qa).then((data) =>{
        console.log(data)
    })
}


// inquire.prompt(qaRole).then((data) =>{
//     console.log(data);
// }).catch((error) =>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log('start');
//     }
// });


module.exports = {menu,askrole}
