INSERT INTO department (name)
VALUES ('hr'),
       ('sales'),
       ('finance'),
       ('engineering'),
       ('legal');

INSERT INTO role (title, salary, department_id)
VALUES ('engineer', 100, 4),
       ('accountant', 100 , 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('bill', 'wilbert', 1, NULL),
       ('john', 'steven', 2, 1);

