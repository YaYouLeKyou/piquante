const multer = require("multer") // Middlware qui permet de gerer les fichiers (ex:images) entrant dans les requète http
const storage = multer.diskStorage({
    destination: "images/",
    filename: function (req, file, cb) {
        cb(null, createFileName(req, file))
    }
}) //destination et format 

function createFileName(req, file) {
    console.log("req, file", file)
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
    file.fileName = fileName
    return fileName
}

const upload = multer({
    storage: storage
})

module.exports = {
    upload
}