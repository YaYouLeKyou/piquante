require("dotenv").config()
const express = require("express") // Middlware qui prend en charge les détails essentiels du backend tels que les sessions, le traitement des erreurs et le routage
const cors = require("cors") // Middlware qui permet de prendre en charge des requêtes multi-origines sécurisées et des transferts de données entre des navigateurs et des serveurs web
const app = express()

//Middleware
app.use(cors())
app.use(express.json())

module.exports = {
    app,
    express
}