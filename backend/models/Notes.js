const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,    //this is the official id of the user   we are adding here because when we want to fetch or add notes we can get that notes using users id

        ref: 'userfield'

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