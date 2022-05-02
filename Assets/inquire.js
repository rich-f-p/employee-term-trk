const inquire = require('inquirer');

const menu = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'menu',
    choices: ['view all employees','add employee','update employee role','view all departments',
    'view all roles','add department','add a role']
}];

