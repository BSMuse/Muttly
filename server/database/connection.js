require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  }
});

// Test the connection
db.connect()
  .then(conn => {
    console.log('Database Connected:', {
      host: conn.host,
      database: conn.database,
      user: conn.user,
      connectionString: !!process.env.DATABASE_URL,
    });
    conn.release();
  })
  .catch(err => console.error('Database connection failed:', err.message));

module.exports = db;
