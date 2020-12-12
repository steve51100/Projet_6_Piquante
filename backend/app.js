const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const userRoutes = require('./routes/user');

//Connection a la base de donnée mongoose
mongoose.connect('mongodb+srv://steve:Maison51@cluster0.jpewg.mongodb.net/Piquante?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


// defini  les hearders pour eviter les erreur de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//Enregistrement des routeurs

app.use('/api/auth', userRoutes);


module.exports = app;