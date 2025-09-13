const express = require("express");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const missionsRouter = require('./routes/missions');
const candidaturesRouter = require('./routes/candidatures');
const authRoutes = require('./routes/auth');


app.use(express.json());
app.use('/missions', missionsRouter);
app.use('/candidatures', candidaturesRouter);
app.use('/auth', authRoutes);



app.listen(PORT, () => {
    console.log(`Serveur fonctionnel on http://localhost:${PORT}`);
});