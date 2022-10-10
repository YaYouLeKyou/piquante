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
    console.log("token validé => get sauces")
    Product.find({}).then(products => res.send(
        products
    ))
    // res.send({
    //     message: "ok, voici tous les plats"
    // })
}

function createSauces(req, res) {
    const product = new Product({
        userID: "hello",
        name: "hello",
        manufacturer: "hello",
        description: "hello",
        mainPepper: "hello",
        imageUrl: "hello",
        heat: 2,
        likes: 2,
        dislikes: 2,
        usersLiked: ["hello"],
        usersDisliked: ["hello"]
    })
    product.save().then(() => console.log("produit enregistré", res)).catch(console.error)
}

module.exports = {
    getSauces,
    createSauces
}