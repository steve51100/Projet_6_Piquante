const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/pass');

//module blocant les attaque de force utilisateur
const rateLimite = require('express-rate-limit');
//Limite la connection abusive
const limiter = rateLimite({
    windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "trop de requete abusive , vous devez attendre 3 minutes",
  
});
console.log(limiter);
// Routes
router.post('/signup',verifyPassword, userCtrl.signup);
router.post('/login',limiter, userCtrl.login);

module.exports = router;