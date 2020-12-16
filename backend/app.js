const express = require('express');
const mongoose = require('mongoose');




//import  du router
const userRoutes = require('./routes/User');


//acces a la base de donner mongoose
mongoose.connect('mongodb+srv://steve:Maison51@cluster0.jpewg.mongodb.net/Piquante?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//autorisation acces depuis  toute origine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



// Enregistrement des routeurs
app.use('/api/auth', userRoutes);




module.exports = app;