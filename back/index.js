require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

//Connection to database
require("./mongo")

//Controllers
const {
    createUser,
    logUser
} = require("./controllers/users")

const {
    getSauces,
    createSauces
} = require("./controllers/sauces")


//Middleware
app.use(cors())
app.use(express.json())

const {
    authenticateUser
} = require("./middleware/auth")

//Routes
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser, createSauces)
app.get("/", (req, res) => res.send("hello world!"))

//Listen
app.listen(port, () => console.log("listening on port " + port))