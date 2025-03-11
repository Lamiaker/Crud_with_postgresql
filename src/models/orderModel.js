const pool = require("../config/db");

const Order = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM orders");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async (user_id, product_id, quantity) => {
    const result = await pool.query(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, product_id, quantity]
    );
    return result.rows[0];
  },
  getByUserId: async (user_id) => {
    const result = await pool.query(
      `SELECT users.name, users.email, orders.quantity, products.name AS product_name
      FROM orders
      JOIN users ON orders.user_id = users.id
      JOIN products ON orders.product_id = products.id
      WHERE orders.user_id = $1`,
      [user_id]
    );
    return result.rows;
}

};

module.exports = Order;
