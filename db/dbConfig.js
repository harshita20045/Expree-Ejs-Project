import mysql from "mysql2";

const pool = mysql.createPool({
    user: "root",
    password: "root",
    database: "event_management",
    host: "localhost",
   
});

export default pool;
