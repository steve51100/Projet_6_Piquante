const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const path = require('path');
const dotenv = require('dotenv').config({ path: process.cwd() + '/.env' });

exports.signup = (req, res, next) => {
  // Hash du mot de passe avec bcrypt
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
      // Création du nouvel utilisateur
      const user = new User({
          email:MaskData.maskEmail2(req.body.email),
          password: hash
      })
      // Sauvegarde dans la base de données
      user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {

  // Recherche d'un utilisateur dans la base de données
  User.findOne({ email: MaskData.maskEmail2(req.body.email) })
  .then(user => {
      // Si on ne trouve pas l'utilisateur
      if(!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !'})
      }
      // On compare le mot de passe de la requete avec celui de la base de données
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
          if(!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !'})
          }
          res.status(200).json({
              userId: user._id,
              // Création d'un token pour sécuriser le compte de l'utilisateur
              token: jwt.sign(
                  { userId: user._id },
                  process.env.DB_TOKEN,
                  { expiresIn: '24h' }
              )
          });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};