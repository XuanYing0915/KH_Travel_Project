import React from 'react'
import LoginForm from '@/components/member/login-form'

export default function Login() {
  return <LoginForm />
}

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost:3306',
  user     : 'root',
  password : 'root',
  password : 'root'
});

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

