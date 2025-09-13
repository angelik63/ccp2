const express = require('express');
const router = express.Router();
const { createMission, getAllMissions, getMissionById, updateMission, deleteMission } = require('../controllers/missionController');


router.post('/', createMission);
router.get('/', getAllMissions);
router.get('/:id', getMissionById);
router.put('/:id', updateMission);
router.delete('/:id', deleteMission);

module.exports = router;
