const express = require("express");
const router = express.Router();
const { createCandidature, updateCandidature, candidatureAcceptee, candidatureRefusee } = require('../controllers/candidatureController.js'); 


router.post("/", createCandidature);
router.put("/:id", updateCandidature);
router.put("/:id/acceptee", candidatureAcceptee);
router.put("/:id/refusee", candidatureRefusee);

module.exports = router;