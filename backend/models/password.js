// variable module npm
const passValidator = require("password-validator");

const passSchema = new passValidator();

// declaration du shema du mot de passe

passSchema
.is().min(8)                                    // Longueur minimun : 8
.has().uppercase(1)                              // Doit avoir au moins une majuscule
.has().lowercase()                              // Doit avoir au moins une minuscule
.has().digits()                                 // Doit avoir au moins un chiffre
.has().not().spaces(0)                           // Ne doit pas avoir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de valeurs à proscrire

// export du shema

module.exports = passSchema;