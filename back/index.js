const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const saucesRoutes = require('./routers/sauces.router');
const userRoutes = require('./routers/auth.router');
const path = require('path');
//le chemin que vous fournissez à la fonction express.static est relatif au répertoire 
//à partir duquel vous lancez votre processus de nœud. 
//Si vous exécutez l'application express à partir d'un autre répertoire, 
//il est plus sûr d'utiliser le chemin absolu du répertoire que vous souhaitez servir gràce a path

const app = express();

const bodyParser = require("body-parser")
//Afin de lire les données HTTP POST, 
//nous devons utiliser le module node "body-parser". 
//body-parser est un morceau de middleware express qui lit l'entrée d'un formulaire 
//et le stocke en tant qu'objet javascript accessible par l'intermédiaire de req.body

dotenv.config();

// Connection to database
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME


mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.fqyz4.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//header d'accès global à l'API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(bodyParser.json())
app.use('/api/sauces', saucesRoutes); //gestion des principaux chemin de l' API
app.use('/api/auth', userRoutes);
module.exports = app;