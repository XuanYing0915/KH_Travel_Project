import React from 'react'
import LoginForm from '@/components/member/login-form'

export default function Login() {
  return <LoginForm />
}

var mysql = require('mysql2');
// var connection = mysql.createConnection({
//   host     : 'localhost:3306',
//   user     : 'root',
//   password : 'root',
//   password : 'root'
// });
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.connect(error => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }

  console.log('Connected as id ' + connection.threadId);
});
module.exports = pool.promise();

connection.connect();

// Create
var post  = {id: 1, name: 'Hello MySQL'};
var query = connection.query('INSERT INTO members SET ?', post, function (error, results, fields) {
  if (error) throw error;
  // Neat!
});

// Read
connection.query('SELECT * FROM members', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

// Update
connection.query('UPDATE members SET name = ? WHERE id = ?', ['new_name', 1], function (error, results, fields) {
  if (error) throw error;
  // Neat!
});

// Delete
connection.query('DELETE FROM members WHERE id = ?', [1], function (error, results, fields) {
  if (error) throw error;
  // Neat!
});

connection.end();

