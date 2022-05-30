// Imports of modules
const mysql = require("mysql2");
const dotenv = require("dotenv").config()
// Connection to SQL database created
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "perntodo",
  port: process.env.DB_PORT,
});

// Connect function connects and handles errors
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL DB!");
});

// Export the connection so it can be accessed in other files
module.exports = connection;