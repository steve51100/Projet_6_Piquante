const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




//import  des routes
const userRoutes = require('./routes/User');
const Sauce = require('./models/Sauce');

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

app.use(bodyParser.json());
//creation des produits sauces

app.post('/api/sauces', (req, res, next) => {
  console.log('apiSauce');
  delete req.body._id;
  console.log(req.body);
  const sauce = new Sauce({
   
    ...req.body.sauce
    
  });
  console.log(sauce);
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});






// Enregistrement des routeurs
app.use('/api/auth', userRoutes);




module.exports = app;