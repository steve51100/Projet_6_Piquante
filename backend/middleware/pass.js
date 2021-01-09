// variable du modele du mot de passe
const passSchema = require("../models/password");

// logique du modele utiliser pour valider le mot de passe

module.exports = (req, res, next) => {
    if (!passSchema.validate(req.body.password)) {
       console.log("erreur le mot de passe dois contenir 08 caractères minimum (dont 1 majuscule, 1 minuscule, 1 chiffre, pas de symbole, espaces autorisés).");
     
    } else {
        next();
    }
};
