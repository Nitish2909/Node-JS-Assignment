import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();

// Replace with your actual credentials
const db = mysql.createConnection(process.env.connectionString);
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Successfully connected to the MySQL database.');
});

/* for local */

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD ,
//     database: process.env.DB_NAME
// })

// db.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database:", err)
//         return
//     }
//     console.log("Connected to the database")
// })

export default db;