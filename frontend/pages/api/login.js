// var mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default async function handler(req, res) {
//   const connection = await pool.getConnection();

//   try {
//     if (req.method === 'POST') {
//       const post  = req.body; // 從請求的 body 中獲取資料
//       const query = await connection.query('INSERT INTO members SET ?', post);
//       res.status(200).json({ message: 'Insert successful.' });
//     } else if (req.method === 'GET') {
//       const results = await connection.query('SELECT * FROM members');
//       res.status(200).json(results);
//     } else if (req.method === 'PUT') {
//       const { name, id } = req.body; // 從請求的 body 中獲取資料
//       await connection.query('UPDATE members SET name = ? WHERE id = ?', [name, id]);
//       res.status(200).json({ message: 'Update successful.' });
//     } else if (req.method === 'DELETE') {
//       const { id } = req.body; // 從請求的 body 中獲取資料
//       await connection.query('DELETE FROM members WHERE id = ?', [id]);
//       res.status(200).json({ message: 'Delete successful.' });
//     } else {
//       res.status(405).end(); // 如果傳送的方法不支援，返回 "Method Not Allowed"
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Database error.' });
//   } finally {
//     // 別忘了在最後結束連接
//     if (connection) connection.release();
//   }
// }
