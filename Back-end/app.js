const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path'); // Module utilisé pour travailler avec des fichiers et chemin d'accés 

const sauceRoutes = require('./routes/sauces'); // J'importe le router sauces
const userRoutes = require('./routes/user') // J'importe le router User

mongoose.connect('mongodb+srv://Bluelux:egIfZv46xom77Drv@cluster0.oaba3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes); // Puis je l'enregistre
app.use('/api/auth', userRoutes); // Puis je l'enregistre



module.exports = app;