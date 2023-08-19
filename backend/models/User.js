const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {

        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('user', UserSchema);  
/*
This line of code is creating a Mongoose model for the "user" collection in your MongoDB database.

The first argument 'user' is the name of the collection in the database. This is the name that will be used to interact with the collection using this model.

The second argument UserSchema refers to a Mongoose Schema that defines the structure and validation rules for the documents in the "user" collection. 

*/