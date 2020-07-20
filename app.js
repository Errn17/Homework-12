const inquirer = require("inquirer");
const mysql = require("mysql");
const console_table = require("console.table");

//setting up connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Shotei1717!",
  database: "employees_DB",
});

// function to make sure connection works correctly, otherwise itll throw an error
connection.connect((err) => {
  if (err) {
    console.log("You have an error connecting, check your code!" + err.stack);
    return;
  }
  console.log("Connected as ID" + connection.threadId);
});

// connection.connect();

//start of employee search
function employeeSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "Choose what you would like to do next",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add new Department",
        "Add new Role",
        "Add new Employee",
        "Exit App",
      ],
    })
    .then((res) => {
      switch (res.action) {
        case "View all Departments":
          viewallDepartments();
          break;
        case "View all Roles":
          viewallRoles();
          break;
        case "View all Employees":
          viewallEmployees();
          break;
        case "Add new Department":
          addnewDepartment();
          break;
        case "Add new Role":
          addnewRole();
          break;
        case "Add new Employee":
          addnewEmployee();
        default:
          exitApp();
          break;
      }
    });
}

employeeSearch();

function viewallDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    console.table(res);
    employeeSearch();
  });
}

function viewallRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.log(res);
    employeeSearch();
  });
}

function viewallEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    employeeSearch();
  });
}

function addnewDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Add New Department",
      },
    ])
    .then((res) => {
      connection.query(
        `INSERT INTO department(department_name) VALUES ("${res.department}")`,
        (err, res) => {
          if (err) throw err;
          console.log(res);
          console.table(res);
          employeeSearch();
        }
      );
    });
}

function addnewRole() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const depRole = res.map(({ id, department_name }) => ({
      name: department_name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What's the title of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What's the salary of the new role?",
        },
        {
          type: "input",
          name: "department",
          message: "What's the department of the new role?",
          choices: depRole,
        },
      ])
      .then((res) => {
        connection.query(
          `INSERT INTO roles(title, salary, department_id) VALUES ("${res.title}", "${res.salary}", "${res.department}")`,
          (err, res) => {
            if (err) throw err;
            console.log(res);
            console.table(res);
            employeeSearch();
          }
        );
        console.log("Successfully added new Role!");
      });
  });
}

function exitApp() {
  console.log("You are now exiting the application");
  process.exit();
}
