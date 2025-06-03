const { Pool } = require('pg');  // Import the Pool class from pg module

// Initialize the connection pool with your PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myblogspot',
  password: '17628936',
  port: 5432,
});


// Automatically create users table if not exists
const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `);
};


createUserTable().catch(err => console.error(err));

// Signup user
const createUser = async (name, email, hashedPassword) => {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
  await pool.query(query, [name, email, hashedPassword]);
};

module.exports = { createUser };
