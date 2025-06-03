const pool = require('../config/db');

async function createAdminTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;
  await pool.query(query);
}

async function createAdmin(email, hashedPassword) {
  const query = 'INSERT INTO admins (email, password) VALUES ($1, $2)';
  await pool.query(query, [email, hashedPassword]);
}

async function findAdminByEmail(email) {
  const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
  return result.rows[0];
}

module.exports = { createAdminTable, createAdmin, findAdminByEmail };
