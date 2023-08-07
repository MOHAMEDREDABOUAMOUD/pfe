// db.js
const { createPool } = require('mysql2');

// Create the database connection pool
const pool = createPool({
    host: '127.0.0.1',
    port: '3306',
    database: 'pfe',
    user: 'root',
    password: ''
});

// pool.query('SELECT 1 + 1 AS solution', (error, results) => {
//     if (error) {
//         console.error('Error connecting to the database:', error);
//         return;
//     }
//     console.log('Connection to the database successful!');
//     console.log('Result:', results[0].solution);
// });
// pool.query('SELECT * from Utilisateur', (error, results) => {
//     if (error) {
//         console.error('Error connecting to the database:', error);
//         return;
//     }
//     console.log('Connection to the database successful!');
//     console.log('Result:', results);
// });

module.exports = pool;