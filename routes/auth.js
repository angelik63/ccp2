const express =require("express");
const router = express.Router();
const { login, register, me } = require('../controllers/authController.js');

router.post('/register',register);
router.post('/login', login);
router.get('/me', me);


module.exports = router;