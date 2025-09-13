const pool = require('../config/db');


/* const createMission = (req, res) => {
  const { titre, description, utilisateur_id } = req.body;

  if (!titre || !description || !utilisateur_id) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }

 
  const query = 'INSERT INTO Missions (titre, description, utilisateur_id) VALUES (?, ?, ?)';
  const values = [titre, description, utilisateur_id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de la création de la mission:", error);
      return res.status(500).send("Erreur lors de la création de la mission.");
    }
    res.status(201).send(`Mission créée avec succès. ID: ${results.insertId}`);
  });
}; */

const createMission = (req, res) => {
  console.log("Requête reçue:", req.body);
  const { titre, description, utilisateur_id, status } = req.body;
  if (!titre || !description || !utilisateur_id) {
    console.log("Champs manquants");
    return res.status(400).send("Tous les champs obligatoires ne sont pas remplis.");
  }

  const query = 'INSERT INTO Missions (titre, description, utilisateur_id, status) VALUES (?, ?, ?, ?)';
  const values = [titre, description, utilisateur_id, status || 'A venir'];

  console.log("Exécution de la requête:", query, values);

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur détaillée lors de la création de la mission:", error);
      return res.status(500).send("Erreur lors de la création de la mission.");
    }
    console.log("Mission créée avec succès. ID:", results.insertId);
    res.status(201).send(`Mission créée avec succès. ID: ${results.insertId}`);
  });
};





const getAllMissions = (req, res) => {
  const query = 'SELECT * FROM Missions';

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération des missions:", error);
      return res.status(500).send("Erreur lors de la récupération des missions.");
    }
    res.status(200).json(results);
  });
};


const getMissionById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Missions WHERE id = ?';

  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la récupération de la mission:", error);
      return res.status(500).send("Erreur lors de la récupération de la mission.");
    }
    if (results.length === 0) {
      return res.status(404).send("Mission non trouvée.");
    }
    res.status(200).json(results[0]);
  });
};


const updateMission = (req, res) => {
  const { id } = req.params;
  const { titre, description, status } = req.body;


  if (!titre || !description || !status) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }


  const query = 'UPDATE Missions SET titre = ?, description = ?, status = ? WHERE id = ?';
  const values = [titre, description, status, id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de la mise à jour de la mission:", error);
      return res.status(500).send("Erreur lors de la mise à jour de la mission.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Mission non trouvée.");
    }
    res.status(200).send("Mission mise à jour avec succès.");
  });
};


const deleteMission = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Missions WHERE id = ?';

  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la suppression de la mission:", error);
      return res.status(500).send("Erreur lors de la suppression de la mission.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Mission non trouvée.");
    }
    res.status(200).send("Mission supprimée avec succès.");
  });
};


module.exports = {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission,
};
