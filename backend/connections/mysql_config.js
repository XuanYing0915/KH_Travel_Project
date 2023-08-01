require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    connectionLimit:10,
    waitForConnections:true,
    dateStrings: true
})

pool.getConnection((err, connection) => {
    if(err){
        console.error("Something went wrong connecting to the database ...");
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) {
        connection.release();
        console.log('Successfully connected to the database.');
    }

    return
});

module.exports = pool.promise(); 