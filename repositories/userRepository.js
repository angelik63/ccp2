const db = require('../config/db');


async function findUserByUserName(nom) {
  const [users] = await db.query('SELECT * FROM Utilisateurs WHERE nom = ?', [nom]);
  return users[0]; 
}

async function createUser(user) {
  const [result] = await db.query(
    'INSERT INTO Utilisateurs (nom, email, password) VALUES (?, ?, ?)',
    [user.nom, user.email, user.password]
  );
  return result.insertId; 
}

module.exports = {
  findUserByUserName,
  createUser
};
