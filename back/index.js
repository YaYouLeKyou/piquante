require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        cb(null, createFileName(req, file))
    }
})

function createFileName(req, file) {
    console.log("req, file", file)
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
    file.fileName = fileName
    return fileName
}

const upload = multer({
    storage: storage
})

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
app.post("/api/auth/signup", createUser);
app.post("/api/auth/login", logUser);
app.get("/api/sauces", authenticateUser, getSauces);
app.post("/api/sauces", authenticateUser, upload.single("image"), createSauces);
app.get("/", (req, res) => res.send("hello world!"));

//Listen
app.use("/images", express.static(path.join(__dirname, "images")))
app.listen(port, () => console.log("listening on port " + port))