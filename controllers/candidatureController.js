const pool = require('../config/db');


const createCandidature = (req, res) => {
  const { utilisateur_id, mission_id } = req.body;

  if (!utilisateur_id || !mission_id) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }


  const query = 'INSERT INTO Candidatures (utilisateur_id, mission_id) VALUES ( ?, ?)';
  const values = [ utilisateur_id, mission_id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de la création de la candidature:", error);
      return res.status(500).send("Erreur lors de la création de la candidature.");
    }
    res.status(201).send(`Candidature créée avec succès. ID: ${results.insertId}`);
  });
};


const updateCandidature = (req, res) => {
  const { id } = req.params;
  const { status} = req.body;


  if (!status ) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }


  const query = 'UPDATE Candidatures SET status = ? WHERE id = ?';
  const values = [status, id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Erreur lors de la mise à jour de la candidature:", error);
      return res.status(500).send("Erreur lors de la mise à jour de la candidature.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Candidature non trouvée.");
    }
    res.status(200).send("Candidature mise à jour avec succès.");
  });
};


const candidatureAcceptee = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE Candidatures SET status = "Acceptée" WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      return res.status(500).send("Erreur lors de la mise à jour du statut.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Candidature non trouvée.");
    }
    res.status(200).send("Statut mis à jour en 'Acceptée'.");
  });
};


const candidatureRefusee = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE Candidatures SET status = "Refusée" WHERE id = ?';
  pool.query(query, [id], (error, results) => {
    if (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      return res.status(500).send("Erreur lors de la mise à jour du statut.");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Candidature non trouvée.");
    }
    res.status(200).send("Statut mis à jour en 'Refusée'.");
  });
};



module.exports = {
  createCandidature,
  updateCandidature,
  candidatureAcceptee,
  candidatureRefusee
};
