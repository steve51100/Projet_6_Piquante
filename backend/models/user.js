const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//création du model user pour stokage dans la base de données
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// uniqueValidator = évite que plusieurs utilisateurs s'inscrivent avec le même mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);