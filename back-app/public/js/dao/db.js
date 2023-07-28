// db.js

import { createPool } from 'mysql';

// Create the database connection pool
const pool = createPool({
    host : '127.0.0.1',
    port : '3306',
    database : 'pfe',
    user : 'root',
    password : ''
});

export default pool;
