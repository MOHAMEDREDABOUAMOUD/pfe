// db.js

import { createPool } from 'mysql';

// Create the database connection pool
const pool = createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
});

export default pool;
