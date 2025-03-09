const pool = require("../config/db");

const User = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async (name, email) => {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    return result.rows[0];
  },

  update: async (id, name, email) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  },
};

module.exports = User;
