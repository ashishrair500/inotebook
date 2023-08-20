const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,      //this is the official id of the user   we are adding here because when we want to fetch or add notes we can get that notes using users id

        ref: 'user'       //ref: 'userfield': This is specifying the referenced model name. In Mongoose, when you set a field's ref property to a model name, it establishes a relationship between the current schema and another model. In this case, the field is establishing a relationship with a model named 'userfield'.

    }
    ,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema); 