const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    userID: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: [String],
    usersDisliked: [String]
})
const Product = mongoose.model("Product", productSchema)


function getSauces(req, res) {

    Product.find({}).then(products => res.send(
        products
    ))
    // res.send({
    //     message: "ok, voici tous les plats"
    // })
}

function createSauces(req, res) {
    const body = req.body
    const file = req.file


    const {
        fileName
    } = file

    const sauce = JSON.parse(req.body.sauce)


    const {
        name,
        manufacturer,
        description,
        mainPepper,
        heat,
        userID
    } = sauce

    function createImageUrl(req, fileName) {
        return req.protocol + "://" + req.get("host") + "/images/" + fileName
    }

    const product = new Product({
        userID,
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl: createImageUrl(req, fileName),
        heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })
    product.save().then(() => console.log("produit enregistré", res)).catch(console.error)
}

module.exports = {
    getSauces,
    createSauces
}