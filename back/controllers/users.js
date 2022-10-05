const {
    User
} = require("../mongo")
const bcrypt = require("bcrypt")

async function createUser(req, res) {
    const {
        email,
        password
    } = req.body

    const hashedPassword = await hashPassword(password)

    const user = new User({
        email,
        password: hashedPassword
    })
    user.save()
        .then(res => console.log("user enregistré!", res))
        .catch(err => console.log("user pas enregistré", err))
}

function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}

module.exports = {
    createUser
}