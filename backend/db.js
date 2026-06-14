const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jesus2026$",
    database: "doit_project"
});
 
// Connect once at startup
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = db;