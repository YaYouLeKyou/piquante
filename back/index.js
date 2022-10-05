console.log("hello world")
const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000

//Database
const mongoose = require("mongoose")
const password = "Nomade75"
const uri = `mongodb+srv://yanes:${password}@cluster0.fqyz4.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri).then((() => console.log("connected to Mongo"))).catch(err => console.error("Error connecting to Mongo: ", err))

const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("user", userSchema)

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.post("/api/auth/signup", (req, res) => {
    console.log("signup request: ", req.body)
    const email = req.body.email
    const password = req.body.password
    console.log({
        email,
        password
    })
    const user = new User({
        email: email,
        password: password
    })
    user.save()
        .then(res => console.log("user enregistré!", res))
        .catch(err => console.log("user pas enregistré", err))

    res.send({
        message: "Utilisateur enregistré !"
    })
})
app.get("/", (req, res) => res.send("hello world!"))
app.listen(port, () => console.log("listening on port " + port))