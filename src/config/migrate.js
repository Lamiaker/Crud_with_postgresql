const pool = require("./db");

const createTables = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `;
    await pool.query(query);
    console.log("✅ Tables créées avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la création des tables :", error);

  } finally {
    pool.end();
  }
};

createTables();
