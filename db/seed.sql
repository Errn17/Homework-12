USE employees_DB;
INSERT INTO department (department_name)
VALUES ("Management"), ("HR"), ("Sales"), ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 250000, 1), ("Human Resources", 70000, 2), ("Sales Lead", 95000, 3), ("Accountant", 100000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Lebron", "James", 1, 1), ("Peyton", "Manning", 2, NULL), ("Will", "Smith", 3, NULL), ("Slim", "Shady", 4, NULL)