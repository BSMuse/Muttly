// database/connect.js
require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool using your Neon database connection string
const db = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon connections
  }
});

// Test the connection
db.connect()
  .then(conn => {
    console.log('Database Connected:', {
      host: conn.host,
      database: conn.database,
      user: conn.user,
    });
    conn.release();
  })
  .catch(err => console.error('Database connection failed:', err.message));

// Export the db pool for use elsewhere
module.exports = db;
