const pool = require('../config/db');

// Function to create a new post
async function createPost(title, category, content) {
  const query = `
    INSERT INTO posts (title, category, content)
    VALUES ($1, $2, $3)
  `;
  await pool.query(query, [title, category, content]);
}

// Function to create the posts table
async function createPostsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
}

// Function to get a post by ID
async function getById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
}

// Function to update a post
async function update(id, { title, category, content }) {
  await pool.query(
    'UPDATE posts SET title=$1, category=$2, content=$3 WHERE id=$4',
    [title, category, content, id]
  );
}

// Function to delete a post
async function deletePost(id) {
  await pool.query('DELETE FROM posts WHERE id=$1', [id]);
}

// ✅ Export all functions
module.exports = {
  createPost,
  createPostsTable,
  getById,
  update,
  delete: deletePost // 👈 expose it as "delete"
};
