const inquirer = require("inquirer");
const mysql = require("mysql");
// const console_table = require("console_table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "null",
  database: "employees_DB",
});

connection.connect((err) => {
  if (err) {
    console.log("You have an error connecting, check your code!" + err.stack);
    return;
  }
  console.log("Connected as ID" + connection.threadId);
});
