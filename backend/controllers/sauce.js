const Sauce = require('../models/Sauce');


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };
  
  // Lecture d'une sauce avec son ID (Get/:id)
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
  
  // Création d'une nouvelle sauce (Post)
  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
  
    // Création d'un nouvel objet Sauce
    const sauce = new Sauce({
      ...sauceObject,
      // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement de l'objet sauce dans la base de données
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };
  