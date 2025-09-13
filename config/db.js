/* const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = db;
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Teste la connexion à la base de données
db.getConnection()
  .then(connection => {
    console.log('Connexion à la base de données réussie !');
    connection.release();
  })
  .catch(error => {
    console.error('Erreur de connexion à la base de données:', error);
  });

module.exports = db;
