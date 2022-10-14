const mongoose = require("mongoose")
const {
    unlink
} = require("fs")

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
    )).catch(error => res.status(500).send(error))

}

function getSauceById(req, res) {
    const {
        id
    } = req.params
    Product.findById(id)
        .then(product => res.send(product))
        .catch(console.error)
}

function deleteSauce(req, res) {
    const {
        id
    } = req.params
    //L'ordre de suppréssion du produit est envoyé a mongo
    product.findByIdAndDelete(id)
        //Supprimer l' image localement
        .then(deleteImage)
        //Envoyer un message de succès au site web(client)
        .then(product => res.send({
            message: product
        }))
        .catch(err => res.status(500).send({
            message: error
        }))
}

function deleteImage(product) {
    const {
        imageUrl
    } = product
    const fileToDelete = imageUrl.split("/").at(-1)
    unlink(`image/${fileToDelete}`, (err) => {
        console.error("probleme a la suppréssion de l'image", err)
        throw new Error("Problème a la suppréssion de l' image" + err)
    })
    return product
}

function createSauces(req, res) {
    const {
        body,
        file
    } = req

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
    product.save().then((message) => {
        res.status(201).send({
            message: message
        })
    }).catch(console.error)
}

module.exports = {
    getSauces,
    createSauces,
    getSauceById,
    deleteSauce
}