const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require('../repositories/userRepository.js')

/* const db = require('../config/db');
 */
const  JWT_SECRET = process.env.JWT_SECRET; 


const register = async (req, res) => {
    const { nom, password, email} =req.body;

 if(!nom || !password || !email) {
    console.log("L'inscription a échoué : champs manquants");
    return res.status(400).json({ error: "Nom , mot de passe et email requis" });
 }   

 const existing = await userRepo.findUserByUserName(nom);
 if (existing) {
    console.log("L'inscription a échoué: L'utilisateur existe déjà");
    return res.status(400).json({ error: "Le nom d'utilisateur existe déjà"});
 }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds) ;
  console.log("Mot de passe hasher correctement");
  

    await userRepo.createUser({ nom, password : hash, email});
    res.status(201).json({ message: "Utilisateur enregistré avec succés"});
}
const login = async (req, res) => {
    const {nom, password} = req.body;

    console.log("Tentative de connection:", nom);

    const user = await userRepo.findUserByUserName(nom);

    if(!user) {  
        return res.status(401).json({error: "Identifiants invalides"});
    }
   /*  if (user.password !== password) {
        return res.status(401).json({ error: "Identifiants invalides"});
    }
    res.json({ message: "Connexion réussie"}); */ 
       const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Identifiants invalides" });

      const token = jwt.sign({ userId: user.id, nom: user.nom }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Connexion réussie", token });
};
  


const me = (req, res) => {
    res.json({ user: req.user });
};

module.exports= {
    register,
    login,
    me
};