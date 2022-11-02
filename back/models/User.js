const mongoose = require('mongoose');
var mongodbErrorHandler = require('mongoose-mongodb-errors');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    //gràce a unique validator la base de donné refusera 2 signup avec le même email avec unique:true
    password: {
        type: String,
        required: true
    }
});
userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);